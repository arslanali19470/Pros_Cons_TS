import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '../../../utils/AppConstants';
import Heading from '../../../components/Headings/Heading';
import { Row } from 'native-base';
import Space from '../../../components/spacer/Space';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { GRAY } from '../../../styles/Colors';

const Settings: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={{ backgroundColor: GRAY, padding: 15 }}>
                <Row space={7} alignItems={"center"}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} style={{ marginTop: 3 }}>
                        <MaterialIcons name={"clear"} color={"white"} size={25} />
                    </TouchableOpacity>
                    <Heading text={"Settings"} weight={700} fontSize={20} color={"white"} />
                </Row>
            </View>
            <View>
                <Space height={10} />
                <View style={{ backgroundColor: "lightgray", padding: 10 }}>
                    <Heading text={"PRO FEATCHER"} color={"white"} fontSize={25} style={{ position: "absolute", transform: [{ rotate: "345deg" }], top: 30, left: 100 }} />
                    <Heading text={"Style"} fontSize={15} />
                    <Space height={10} />
                    <View style={styles.underline} />
                    <Space height={10} />
                    <Row justifyContent={"space-between"}>
                        <Heading text={"Color Theme"} />
                        <Heading text={"LIGHT"} />
                    </Row>
                    <Space height={10} />
                </View>
                <View style={{ padding: 10 }}>
                    <Space height={10} />
                    <Heading text={"Support"} fontSize={15} />
                    <Space height={10} />
                    <Space height={10} />
                    <Heading text={"Contact us"} />
                    <Space height={10} />
                    <Space height={10} />
                    <Heading text={"Rate the App"} />
                    <Space height={10} />
                    <Space height={30} />
                    <Heading text={"App Version 1.5.2"} fontSize={12} />
                </View>
            </View>
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    underline: {
        width: "100%",
        height: 0.1,
    },
});
