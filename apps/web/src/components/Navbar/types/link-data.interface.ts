import { RoutePath } from '../../../routes';

export interface LinkData {
  link: RoutePath;
  label: string;
  regex: RegExp;
}
