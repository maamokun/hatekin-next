import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

interface ThemeConfig {}

interface ThemeStyles {
    global: (props: any) => any;
}

const themeConfig: ThemeConfig = {};

const themeStyles: ThemeStyles = {
    global: (props) => ({
        body: {
            bg: mode("lightColor", "darkColor")(props),
        },
    }),
};

export const theme = extendTheme({
    config: themeConfig,
    styles: themeStyles,
});
