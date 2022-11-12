import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

const TimePicker = ({
  handleVisibleDatePicker,
  isDatePickerVisible,
  updateTime,
  period,
}) => {
  const handleConfirm = (time) => {
    updateTime(moment(time).format("LT"), period);
    handleVisibleDatePicker();
    console.log(moment(time).format("LT"));
  };

  return (
    <View>
      <Button
        onPress={handleVisibleDatePicker}
        type="clear"
        buttonStyle={{
          width: 50,
        }}
        titleStyle={{
          color: "#000",
          fontFamily: "Poppings-Bold",
          fontSize: 14,
          marginRight: 5,
          textDecorationLine: "underline",
        }}
      >
        Set
        <MaterialCommunityIcons
          name="timer-settings"
          color={"#000"}
          size={20}
        />
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={handleVisibleDatePicker}
      />
    </View>
  );
};

export default TimePicker;
