export function hasProps(obj: any, props: string[]): boolean {
    return props.every(prop => obj.hasOwnProperty(prop));
  }
  