import { makeAutoObservable } from 'mobx';
// import { request } from '../../utils/request';

class MainStore {
  rootStore;
  constructor(rootStore: any) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  state = {
    themeColor: '#c62f2f',
  };
  setThemeColor(data: string) {
    this.state.themeColor = data;
  }
  get getThemeColor() {
    return this.state.themeColor;
  }
  //   async getTodos() {
  //     const data = await request.get('/todos');
  //     this.setTodos(data);
  //   }
  //   setTodos(data) {
  //     this.state.list = data;
  //   }
  //   async delTodos(id) {
  //     await request.delete(`/todos/${id}`);
  //     await this.getTodos();
  //   }
  //   async updateTodos(id, key, value) {
  //     await request.patch(`/todos/${id}`, { [key]: value });
  //     await this.getTodos();
  //   }
  //   async addTodos(name) {
  //     await request.post('/todos', {
  //       name,
  //       done: false,
  //     });
  //     await this.getTodos();
  //   }
  //   get mainRadioStatus() {
  //     return this.state.list.every(item => item.done);
  //   }
  //   async updatePerRadioStatus(done) {
  //     const promiseArr = this.state.list.map(item =>
  //       this.updateTodos(item.id, 'done', done)
  //     );
  //     await Promise.all(promiseArr);
  //     await this.getTodos();
  //   }

  //   get completed() {
  //     return this.state.list.filter(item => item.done);
  //   }

  //   async clearCompleted() {
  //     const promiseArr = this.completed.map(item => this.delTodos(item.id));
  //     await Promise.all(promiseArr);
  //     await this.getTodos();
  //   }
  //   get unCompleted() {
  //     return this.state.list.filter(item => !item.done);
  //   }
  //   get renderList() {
  //     const active = this.rootStore.footerStore.state.active;
  //     console.log(active);
  //     return active === 'Active'
  //       ? this.unCompleted
  //       : active === 'Completed'
  //       ? this.completed
  //       : this.state.list;
  //   }
}
export default MainStore;
