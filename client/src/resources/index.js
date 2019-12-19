import {PLATFORM} from 'aurelia-pal';


export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./elements/nav-bar'),
    PLATFORM.moduleName('./elements/flat-picker'),
    PLATFORM.moduleName('./value-converters/date-format'),
    // PLATFORM.moduleName('./value-converters/filter-todos')
  ]);
}

