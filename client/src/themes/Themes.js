import { defaults } from "../assets/Defaults";

export const themes = {
  engineRev: {
    theme: "EngineRev",
    themeAlternate: "engineRev",
    background: "engineRevThemeBackground",
    hr: "engineRevThemeHr",
    serviceLogs: "engineRevThemeServiceLogs",
    vehicleItemList: "engineRevThemeVehicleItemList",
    vehicleItemListFont: "engineRevThemeVehicleItemListFont",
    oneThread: "engineRevThemeOneThread",
    oneUpdate: "engineRevThemeOneUpdate",
    accountDetails: "engineRevThemeAccountDetails",
    aboutContainer: "engineRevAboutContainer",
    backgroundColor: "rgb(220, 220, 220)"
  },
  light: {
    theme: "Light",
    themeAlternate: "light",
    background: "lightThemeBackground",
    hr: "lightThemeHr",
    serviceLogs: "lightThemeServiceLogs",
    vehicleItemList: "lightThemeVehicleItemList",
    vehicleItemListFont: "lightThemeVehicleItemListFont",
    oneThread: "lightThemeOneThread",
    oneUpdate: "lightThemeOneUpdate",
    accountDetails: "lightThemeAccountDetails",
    aboutContainer: "lightThemeAboutContainer",
    backgroundColor: "rgb(245, 245, 245)"
  },
  grey: {
    theme: "Grey",
    themeAlternate: "grey",
    background: "greyThemeBackground",
    hr: "greyThemeHr",
    serviceLogs: "greyThemeServiceLogs",
    vehicleItemList: "greyThemeVehicleItemList",
    vehicleItemListFont: "greyThemeVehicleItemListFont",
    oneThread: "greyThemeOneThread",
    oneUpdate: "greyThemeOneUpdate",
    accountDetails: "greyThemeAccountDetails",
    aboutContainer: "greyThemeAboutContainer",
    backgroundColor: "rgb(112, 112, 112)"
  },
  dark: {
    theme: "Dark",
    themeAlternate: "dark",
    background: "darkThemeBackground",
    hr: "darkThemeHr",
    serviceLogs: "darkThemeServiceLogs",
    vehicleItemList: "darkThemeVehicleItemList",
    vehicleItemListFont: "darkThemeVehicleItemListFont",
    oneThread: "darkThemeOneThread",
    oneUpdate: "darkThemeOneUpdate",
    accountDetails: "darkThemeAccountDetails",
    aboutContainer: "darkThemeAboutContainer",
    backgroundColor: "rgb(16, 16, 16)"
  },
  red: {
    theme: "Red",
    themeAlternate: "red",
    background: "redThemeBackground",
    hr: "redThemeHr",
    serviceLogs: "redThemeServiceLogs",
    vehicleItemList: "redThemeVehicleItemList",
    vehicleItemListFont: "redThemeVehicleItemListFont",
    oneThread: "redThemeOneThread",
    oneUpdate: "redThemeOneUpdate",
    accountDetails: "redThemeAccountDetails",
    aboutContainer: "redThemeAboutContainer",
    backgroundColor: "rgb(68, 0, 0)"
  },
  orange: {
    theme: "Orange",
    themeAlternate: "orange",
    background: "orangeThemeBackground",
    hr: "orangeThemeHr",
    serviceLogs: "orangeThemeServiceLogs",
    vehicleItemList: "orangeThemeVehicleItemList",
    vehicleItemListFont: "orangeThemeVehicleItemListFont",
    oneThread: "orangeThemeOneThread",
    oneUpdate: "orangeThemeOneUpdate",
    accountDetails: "orangeThemeAccountDetails",
    aboutContainer: "orangeThemeAboutContainer",
    backgroundColor: "rgb(168, 68, 0)"
  },
  transparentLight: {
    theme: "Transparent Light",
    themeAlternate: "transparentLight",
    background: "transparentLightThemeBackground",
    hr: "transparentLightThemeHr",
    serviceLogs: "transparentLightThemeServiceLogs",
    vehicleItemList: "transparentLightThemeVehicleItemList",
    vehicleItemListFont: "transparentLightThemeVehicleItemListFont",
    oneThread: "transparentLightThemeOneThread",
    oneUpdate: "transparentLightThemeOneUpdate",
    accountDetails: "transparentLightThemeAccountDetails",
    aboutContainer: "transparentLightThemeAboutContainer",
    backgroundColor: "rgb(235, 235, 235)"
  },
  transparentGrey: {
    theme: "Transparent Grey",
    themeAlternate: "transparentGrey",
    background: "transparentGreyThemeBackground",
    hr: "transparentGreyThemeHr",
    serviceLogs: "transparentGreyThemeServiceLogs",
    vehicleItemList: "transparentGreyThemeVehicleItemList",
    vehicleItemListFont: "transparentGreyThemeVehicleItemListFont",
    oneThread: "transparentGreyThemeOneThread",
    oneUpdate: "transparentGreyThemeOneUpdate",
    accountDetails: "transparentGreyThemeAccountDetails",
    aboutContainer: "transparentGreyThemeAboutContainer",
    backgroundColor: "rgb(112, 112, 112)"
  },
  transparentDark: {
    theme: "Transparent Dark",
    themeAlternate: "transparentDark",
    background: "transparentDarkThemeBackground",
    hr: "transparentDarkThemeHr",
    serviceLogs: "transparentDarkThemeServiceLogs",
    vehicleItemList: "transparentDarkThemeVehicleItemList",
    vehicleItemListFont: "transparentDarkThemeVehicleItemListFont",
    oneThread: "transparentDarkThemeOneThread",
    oneUpdate: "transparentDarkThemeOneUpdate",
    accountDetails: "transparentDarkThemeAccountDetails",
    aboutContainer: "transparentDarkThemeAboutContainer",
    backgroundColor: "rgb(16, 16, 16)"
  },
  transparentRed: {
    theme: "Transparent Red",
    themeAlternate: "transparentRed",
    background: "transparentRedThemeBackground",
    hr: "transparentRedThemeHr",
    serviceLogs: "transparentRedThemeServiceLogs",
    vehicleItemList: "transparentRedThemeVehicleItemList",
    vehicleItemListFont: "transparentRedThemeVehicleItemListFont",
    oneThread: "transparentRedThemeOneThread",
    oneUpdate: "transparentRedThemeOneUpdate",
    accountDetails: "transparentRedThemeAccountDetails",
    aboutContainer: "transparentRedThemeAboutContainer",
    backgroundColor: "rgb(68, 0, 0)"
  },
  transparentOrange: {
    theme: "Transparent Orange",
    themeAlternate: "transparentOrange",
    background: "transparentOrangeThemeBackground",
    hr: "transparentOrangeThemeHr",
    serviceLogs: "transparentOrangeThemeServiceLogs",
    vehicleItemList: "transparentOrangeThemeVehicleItemList",
    vehicleItemListFont: "transparentOrangeThemeVehicleItemListFont",
    oneThread: "transparentOrangeThemeOneThread",
    oneUpdate: "transparentOrangeThemeOneUpdate",
    accountDetails: "transparentOrangeThemeAccountDetails",
    aboutContainer: "transparentOrangeThemeAboutContainer",
    backgroundColor: "rgb(168, 68, 0)"
  },
  determineTheme(theme) {
    let themeType;
    switch (theme) {
      case defaults.engineRevTheme:
        themeType = themes.engineRev;
        break;
      case defaults.lightTheme:
        themeType = themes.light;
        break;
      case defaults.greyTheme:
        themeType = themes.grey;
        break;
      case defaults.darkTheme:
        themeType = themes.dark;
        break;
      case defaults.redTheme:
        themeType = themes.red;
        break;
      case defaults.orangeTheme:
        themeType = themes.orange;
        break;
      case defaults.transparentLightTheme:
        themeType = themes.transparentLight;
        break;
      case defaults.transparentGreyTheme:
        themeType = themes.transparentGrey;
        break;
      case defaults.transparentDarkTheme:
        themeType = themes.transparentDark;
        break;
      case defaults.transparentRedTheme:
        themeType = themes.transparentRed;
        break;
      case defaults.transparentOrangeTheme:
        themeType = themes.transparentOrange;
        break;
      default:
        themeType = themes.engineRev;
    }
    return themeType;
  }
};
