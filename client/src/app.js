import {PLATFORM} from 'aurelia-pal';
// import bootstrap from 'bootstrap';

export class App {
    configureRouter(config, router) {
      this.router = router;
      config.title = 'Things ToDo';
      config.map([
        { 
          route: ['','home'],
          name: 'home',       
          moduleId: PLATFORM.moduleName('./modules/home') ,
          title: 'Home'
        },
        { 
          route: 'users',            
          name: 'users',      
          moduleId: PLATFORM.moduleName('./modules/users'), 
          title: 'Users' 
        }, 
        {
          route: 'todos',
          name: 'todos',
          moduleId: PLATFORM.moduleName('./modules/todos'),
          title: 'Todos'
        }
      ]);
    }
  }