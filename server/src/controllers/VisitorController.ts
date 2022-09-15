import Visitor from "../models/Visitor";
import VisitedPage from "../models/VisitedPage";
import mongoose from "mongoose";
const getIP = require("ipware")().get_ip;
const geoip = require("geoip-country");
import lookup from "country-code-lookup";

export class VisitorController {
  public static async getVisitorStats(_req, res) {
    const visitors = await Visitor.find();

    let totalVisitsPerPage: any[] = [];

    for (let visitor of visitors) {
      for (let page of visitor.pagesVisited) {
        let _page = totalVisitsPerPage.find((p) => p.url === page.url);
        if (!_page) {
          totalVisitsPerPage.push({
            url: page.url,
            count: page.count,
          });
        } else {
          _page.count += page.count;
        }
      }
    }

    res.send({ totalVisitsPerPage });
  }

  public static async resetVisitors(_req, res) {
    await Visitor.deleteMany();
    res.sendStatus(204);
  }

  public static async registerPageVisit(req, res) {
    const ip = getIP(req).clientIp;
    const geo = geoip.lookup(ip);

    let country = "N/A";
    if (geo && geo.country) {
      country = lookup.byIso(geo.country)?.country ?? "N/A";
    }

    let visitor = await Visitor.findOne({ ipAddress: ip });
    if (!visitor) {
      visitor = new Visitor({
        ipAddress: ip,
        country,
      });

      await visitor.save();
    }

    const visitedPage = new VisitedPage({
      url: req.body.url,
      pageTitle: req.body.pageTitle,
      visitorId: visitor._id,
      scrolledToBottomCount: 0,
    });
    await visitedPage.save();
    visitor.updatedAt = new Date();
    await visitor.save();

    res.send(visitedPage);
  }

  public static async updateVisitedPage(req, res) {
    const visitedPage = await VisitedPage.findById(req.body.id);
    if (!visitedPage) {
      return res.send({ message: "Visited page not found" });
    }

    if (req.body.timeOnPage) {
      visitedPage.timeOnPage = req.body.timeOnPage;
    } else if (req.body.scrolledToBottom) {
      visitedPage.scrolledToBottomCount++;
    }
    await visitedPage.save();

    let visitor = await Visitor.findById(visitedPage.visitorId);
    visitor.updatedAt = new Date();
    await visitor.save();

    res.sendStatus(204);
  }

  public static async getVisitedPages(req, res) {
    const limit = 30;
    const page = parseInt(req.query.page);
    const visitor = await Visitor.findById(req.params.id);
    const pages = await VisitedPage.find({
      visitorId: req.params.id,
      url: req.query.url,
    })
      .limit(limit)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit);

    const total = await VisitedPage.find({
      visitorId: req.params.id,
      url: req.query.url,
    }).countDocuments();

    res.send({ pages, total, visitor });
  }

  public static async browseVisitors(req, res) {
    const limit = 10;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;

    const visitors = await Visitor.aggregate([
      {
        $sort: {
          updatedAt: -1,
        },
      },

      {
        $skip: page * limit,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "visited_pages",
          let: { docId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$visitorId", "$$docId"],
                },
              },
            },
            {
              $group: {
                _id: "$url",
                count: { $sum: 1 },
              },
            },
          ],
          as: "visited_pages",
        },
      },
      {
        $project: {
          visited_pages: 1,
          country: 1,
          ipAddress: 1,
          visitedPagesCount: {
            $size: "$visited_pages",
          },
        },
      },
    ]);

    const totalEntries = await Visitor.countDocuments();

    res.send({ rows: visitors, totalRows: totalEntries });
  }

  public static async updateVisitorLanguage(req, res) {
    const ip = getIP(req).clientIp;

    let visitor = await Visitor.findOne({ ipAddress: ip });

    if (!visitor) {
      visitor = new Visitor({
        ipAddress: ip,
        language: req.body.language,
      });

      await visitor.save();
    } else {
      visitor.language = req.body.language;
      await visitor.save();
    }

    res.sendStatus(204);
  }
}
