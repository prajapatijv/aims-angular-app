import { AIMS.Angular.AppPage } from './app.po';

describe('aims.angular.app App', () => {
  let page: AIMS.Angular.AppPage;

  beforeEach(() => {
    page = new AIMS.Angular.AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
