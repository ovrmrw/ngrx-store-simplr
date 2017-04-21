import { SimplrTimestampPage } from './app.po';

describe('simplr-timestamp App', () => {
  let page: SimplrTimestampPage;

  beforeEach(() => {
    page = new SimplrTimestampPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
