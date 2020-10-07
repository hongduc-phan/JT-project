import {ReactNode, createElement, AllHTMLAttributes, Component} from 'react';
import clsx from 'clsx';
import {TypoColors, TypoVariants, TypoAlignment} from './types';

import styles from './Typo.module.css';

export interface TypoProps<T> extends AllHTMLAttributes<T> {
  children?: ReactNode;
  align?: TypoAlignment;
  className?: string;
  color?: TypoColors;
  variant?: TypoVariants;
  tag?: string;
}

class Typo<T = HTMLSpanElement> extends Component<TypoProps<T>> {
  private static getColor(color: string) {
    switch (color) {
      case TypoColors.inherit:
        return styles.inherit;
      case TypoColors.black:
        return styles.black;
      case TypoColors.white:
        return styles.white;
      case TypoColors.greyDark:
        return styles.greyDark;
      case TypoColors.greyMedium:
        return styles.greyMedium;
      case TypoColors.blue:
        return styles.blue;
      case TypoColors.red:
        return styles.red;
      default:
        return styles.black;
    }
  }

  private static getVariant(variant: string) {
    switch (variant) {
      case TypoVariants.h1:
        return styles.h1;
      case TypoVariants.h2:
        return styles.h2;
      case TypoVariants.h3:
        return styles.h3;
      case TypoVariants.h4:
        return styles.h4;
      case TypoVariants.h5:
        return styles.h5;
      case TypoVariants.body1:
        return styles.body1;
      case TypoVariants.body2:
        return styles.body2;
      case TypoVariants.button:
        return styles.button;
      case TypoVariants.subTitle:
        return styles.subTitle;
      default:
        return styles.body1;
    }
  }

  private static getAlign(align: string) {
    if (TypoAlignment.middle === align) {
      return styles.middle;
    }

    return styles.left;
  }

  public render() {
    const {
      children,
      align = 'left',
      color = TypoColors.black,
      variant = TypoVariants.body1,
      tag = 'span',
      className,
      ...other
    } = this.props;
    return createElement(
      tag,
      {
        ...other,
        className: clsx(
          styles.typo,
          className,
          Typo.getVariant(variant),
          Typo.getColor(color),
          Typo.getAlign(align),
        ),
      },
      children,
    );
  }
}

export default Typo;
