import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

interface InfoBoxProps {
  title: number | string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
