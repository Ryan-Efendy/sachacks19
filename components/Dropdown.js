import React, { Component } from 'react';
import { Item, Picker, Icon, Content, Text } from 'native-base';

const Dropdown = ({
    text,
    placeholder,
    selectedValue,
    onValueChange,
    datas
}) => (
    <Content style={{ marginBottom: 10 }}>
        <Text style={{ flex: 1, color: 'white', fontWeight: 'bold' }}>
            {text}
        </Text>
        <Item picker>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ flex: 2, width: undefined }}
                placeholder={placeholder}
                placeholderStyle={{ color: 'white' }}
                placeholderIconColor="#007aff"
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            >
                {datas.map(data => (
                    <Picker.Item
                        label={data.label}
                        value={data.value}
                        key={data.label}
                    />
                ))}
            </Picker>
        </Item>
    </Content>
);

export default Dropdown;
