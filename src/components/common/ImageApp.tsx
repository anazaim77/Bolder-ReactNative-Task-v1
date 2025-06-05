import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";
import { Image, ImageContentFit, ImageProps } from "expo-image";
import { CommonStyle } from "./styles/style";
import { getCommonStyle } from "./styles/style";

interface ImageAppProps extends ImageProps, CommonStyle {
  source?: ImageSourcePropType;
  blurhash?: string;
}

const blurhash = "LEHLh[WB2yk8pyoJadR*.7kCMdnj";

const ImageApp: React.FC<ImageAppProps> = ({ source, style, ...props }) => {
  const _style = getCommonStyle(props);
  return (
    <Image
      source={source}
      style={[
        style,
        _style as StyleProp<ImageStyle>,
        {
          width: _style.width || 100,
          height: _style.height || 100,
        },
      ]}
      contentFit={(props.resizeMode as ImageContentFit) || "contain"}
      placeholder={{ blurhash: props.blurhash || blurhash }}
      {...props}
    />
  );
};

export default ImageApp;
