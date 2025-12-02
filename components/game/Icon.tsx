import {
    Backpack,
    Banknote, //words
    Binary,
    BookOpen,
    BusFront,
    Calendar, Clock,
    Coffee,
    Donut,
    Hand, //transportation
    Info, //default
    MapPinCheckIcon,
    MessageCircle,
    Plane,
    Salad, //food
    Speech,
    Store, //number
    Utensils
} from 'lucide-react-native';
import React from 'react';
import { ViewStyle } from 'react-native';

type AppIconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
};

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 28,
  color = '#18130cff',
  style,
}) => {
  //Scenario
  if (name === 'scene'){
    return <Speech size={size} color={color} style={style} />
  }
  if (name === 'coffee') {
    return <Coffee size={size} color={color} style={style} />;
  }
  if (name === 'plane') {
    return <Plane size={size} color={color} style={style} />;
  }
  if (name === 'store') {
    return <Store size={size} color={color} style={style} />;
  }
  //Food
if (name === 'food'){
    return <Utensils size={size} color={color} style={style} />
  }
  if (name === 'general') {
    return <Salad size={size} color={color} style={style} />;
  }
  if (name === 'street') {
    return <Donut size={size} color={color} style={style} />;
  }
  //transportation
if (name === 'transport'){
    return <MapPinCheckIcon size={size} color={color} style={style} />
  }
  if (name === 'vehicles') {
    return <BusFront size={size} color={color} style={style} />;
  }
  if (name === 'travel') {
    return <Backpack size={size} color={color} style={style} />;
  }
  // Words
  if (name === 'words'){
    return <Info size={size} color={color} style={style} />
  }
  if (name === 'greeting') {
    return <Hand size={size} color={color} style={style} />;
  }
  if (name === 'phrases') {
    return <MessageCircle size={size} color={color} style={style} />;
  }
  //numbers
  if (name === 'numbers') {
    return <Binary size={size} color={color} style={style} />;
  }
  if (name === 'sino'){
    return <Calendar size={size} color={color} style={style} />
  }
  if (name === 'native') {
    return <Clock size={size} color={color} style={style} />;
  }
  if (name === 'money') {
    return <Banknote size={size} color={color} style={style} />;
  }

  // default/fallback
  return <BookOpen size={size} color={color} style={style} />;
};
