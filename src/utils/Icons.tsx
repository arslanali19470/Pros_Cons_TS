import React from 'react';
import {MaterialIcons} from './AppConstants';

interface IconProps {
  color: string;
}

export const BarIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="format-list-bulleted" size={25} color={color} />
);

export const TrashIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="delete" size={25} color={color} />
);

export const SettingsIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="settings" size={25} color={color} />
);

export const CartIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="shopping-cart" size={25} color={color} />
);
