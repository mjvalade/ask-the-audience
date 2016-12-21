import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "backgroundColor": "#F59D2A",
        "fontFamily": "'Raleway', sans-serif"
    },
    "header": {
        "display": "flex",
        "backgroundColor": "#2C3D4F",
        "height": 80,
        "textAlign": "center",
        "justifyContent": "center",
        "alignItems": "center"
    },
    "h1": {
        "display": "flex",
        "color": "#EE7738",
        "fontSize": 3,
        "fontFamily": "'Anton', sans-serif"
    },
    "status": {
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "center",
        "fontWeight": "bold",
        "fontSize": 1.5,
        "marginTop": 10,
        "marginRight": 0,
        "marginBottom": 10,
        "marginLeft": 0
    },
    "status-text": {
        "color": "#EE7738",
        "marginTop": 10,
        "marginRight": 0,
        "marginBottom": 10,
        "marginLeft": 10
    },
    "container": {
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "center",
        "alignItems": "center"
    },
    "vote": {
        "textAlign": "center",
        "marginBottom": 20,
        "marginTop": 20,
        "color": "#2C3D4F",
        "fontSize": 2,
        "fontWeight": "700",
        "fontFamily": "'Anton', sans-serif"
    },
    "user-vote": {
        "textAlign": "center",
        "marginBottom": 20,
        "marginTop": 20,
        "color": "#2C3D4F",
        "fontSize": 1.5,
        "fontWeight": "700"
    },
    "button": {
        "backgroundColor": "#2C3D4F",
        "color": "#EE7738",
        "border": "none",
        "borderRadius": 5,
        "height": 60,
        "width": 60,
        "fontSize": 40
    },
    "button:hover": {
        "backgroundColor": "#EE7738",
        "border": "3px solid #2C3D4F",
        "color": "#2C3D4F"
    },
    "results": {
        "marginBottom": 5,
        "marginTop": 5,
        "color": "#2C3D4F",
        "fontSize": 1.5,
        "fontWeight": "700"
    }
});