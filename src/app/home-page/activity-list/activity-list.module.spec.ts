import { ActivityListModule } from './activity-list.module';

describe('ActivityListModule', () => {
  let activityListModule: ActivityListModule;

  beforeEach(() => {
    activityListModule = new ActivityListModule();
  });

  it('should create an instance', () => {
    expect(activityListModule).toBeTruthy();
  });
});
