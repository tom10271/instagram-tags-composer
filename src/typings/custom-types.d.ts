declare interface Window {
    hbx: {
        courierTrackingPatterns: Array<{
            name: string,
            regEx: RegExp
        }>
        getCourierNameByTrackingCode: (string) => string
    };
    __VUE_OPTIONS_API__: boolean;
    NODE_ENV: string;
}

declare let APP_VERSION: string;
declare let NODE_ENV: string;
declare let __VUE_OPTIONS_API__: boolean;

declare let HBXAvailableCountries: Array<{
    name: string,
    isoName: string
}>;

