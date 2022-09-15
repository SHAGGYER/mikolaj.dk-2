export interface IAppSettings {
    _id: string;
    appName: string;
    oauthClientId: string;
    oauthServerUrl: string;
    homepageHeaderImage: string;
    homepageAboutPlatformImage?: string;
    homepageHireImage?: string;
    availableForWork: boolean;
    youtubeViews: number;
    createdAt: Date;
    updatedAt: Date;
}
