import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PublicContext from "../contexts/PublicContext";
import { useClickOutside } from "../hooks/ClickOutside";
import HttpClient from "../services/HttpClient";
import { useKeyPress } from "../hooks/KeyPress";

const SearchResult = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
  background-color: ${(props) => (props.hover ? "#ccc" : "white")};

  & h4 {
    font-weight: normal;
    font-size: 12px;
  }

  & h3 {
    font-weight: normal;
    font-size: 16px;
  }
`;

const Search = styled.div`
  position: relative;
  margin: 0 0.5rem;
  display: flex;
  border: 1px solid var(--secondary);
  border-radius: 20px;
  background-color: white;
  padding: 0 0 0 1rem;
  align-items: center;

  & input {
    border: none;
    padding: 0.5rem 1rem;
    width: 200px;
    outline: none;
    flex-grow: 1;
    border-radius: 20px;
  }

  & .results {
    position: absolute;
    left: 0;
    top: 40px;
    border: 1px solid var(--secondary);
    background-color: white;
    display: ${(props) => (props.open ? "flex" : "none")};
    width: 300px;
    z-index: 100;
    flex-direction: column;
  }
`;

const DEFAULT_SEARCH_RESULTS = [
  {
    name: "Hjem",
    path: "/",
    type: "built-in",
  },
  {
    name: "Lidt Om Mig",
    path: "/about",
    type: "built-in",
  },
  {
    name: "Blog",
    path: "/blog",
    type: "built-in",
  },
  {
    name: "Shop",
    path: "/shop",
    type: "built-in",
  },
  {
    name: "Kontakt",
    path: "/contact",
    type: "built-in",
  },
  {
    name: "Mine Hobbies",
    path: "/about/hobbies",
    type: "built-in",
  },
  {
    name: "Mine Færdigheder",
    path: "/about/skills",
    type: "built-in",
  },
  {
    name: "Job",
    path: "/about/job",
    type: "built-in",
  },
  {
    name: "Mine Uddannelse",
    path: "/about/education",
    type: "built-in",
  },
  {
    name: "Mine Certifikater",
    path: "/about/certificates",
    type: "built-in",
  },
  {
    name: "Gennemse Kurser",
    path: "/courses",
    type: "built-in",
  },
  {
    name: "1-til-1 Intro",
    path: "/learning",
    type: "built-in",
  },
  {
    name: "1-til-1 Pensum",
    path: "/learning/curriculum",
    type: "built-in",
  },
  {
    name: "1-til-1 Priser",
    path: "/learning/pricing",
    type: "built-in",
  },
  {
    name: "1-til-1 Bestil",
    path: "/learning/order",
    type: "built-in",
  },
  {
    name: "Dine Apps",
    path: "/apps/your-apps",
    type: "built-in",
  },
  {
    name: "Couples.dk",
    path: "/apps/couples",
    type: "built-in",
  },
  {
    name: "Coingo.dk",
    path: "/apps/coingo",
    type: "built-in",
  },
  {
    name: "Find Program",
    path: "/fitness/program",
    type: "built-in",
  },
  {
    name: "TDEE Lommeregner",
    path: "/fitness/tdee",
    type: "built-in",
  },
  {
    name: "BMI Lommeregner",
    path: "/fitness/bmi",
    type: "built-in",
  },
  {
    name: "Kropsfedt Lommeregner",
    path: "/fitness/body-fat",
    type: "built-in",
  },
];

const first5SearchResults = DEFAULT_SEARCH_RESULTS.filter(
  (_, index) => index < 5
);

export default () => {
  const { redirect } = useContext(PublicContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");

  useEffect(() => {
    if (results.length && downPress) {
      setCursor((prevState) =>
        prevState < results.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (results.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (results.length && enterPress && open) {
      redirect(results[cursor].path);
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (results.length && hovered > -1) {
      setCursor(hovered);
    }
  }, [hovered]);

  const wrapperRef = useRef();

  useClickOutside(wrapperRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (query) {
      const timeoutId = setTimeout(() => {
        search();
      }, 300);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setResults(first5SearchResults);
    }
  }, [query]);

  const search = async () => {
    let _results = DEFAULT_SEARCH_RESULTS.filter((result, index) =>
      result.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    const { data } = await HttpClient().post("/api/search/" + query);
    _results = [..._results, ...data];
    setResults(_results.filter((_, index) => index < 5));

    if (_results.length) {
      setOpen(true);
    }
  };

  const handleChangeQuery = (value) => {
    setQuery(value);
  };

  const handleFocus = () => {
    if (!open && results.length) {
      setOpen(true);
    }
  };

  const getIconForResult = (type) => {
    switch (type) {
      case "built-in":
        return "file";
      case "blog":
        return "rss";
      case "course":
        return "video";
      case "shop-category":
        return "th-large";
      case "shop-product":
        return "bookmark";
    }
  };

  const getResultType = (type) => {
    switch (type) {
      case "built-in":
        return "Side";
      case "blog":
        return "Blog";
      case "course":
        return "Kursus";
      case "shop-category":
        return "Shop Kategori";
      case "shop-product":
        return "Produkt";
    }
  };

  return (
    <Search open={open}>
      <i className="fas fa-search" />
      <input
        placeholder="Søg efter alt..."
        value={query}
        onFocus={handleFocus}
        onChange={(e) => handleChangeQuery(e.target.value)}
      />
      <div className="results" ref={wrapperRef}>
        {results.map((result, index) => (
          <SearchResult
            hover={cursor === index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(undefined)}
            onClick={() => redirect(result.path)}
            key={index}
          >
            <div>
              <h4>{getResultType(result.type)}</h4>

              <h3>{result.name}</h3>
            </div>
            <i className={"fas fa-" + getIconForResult(result.type)}></i>
          </SearchResult>
        ))}
      </div>
    </Search>
  );
};
