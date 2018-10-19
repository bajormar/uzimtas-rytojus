import { ActivityFilterModule } from './activity-filter.module';

describe('ActivityFilterModule', () => {
  let activityFilterModule: ActivityFilterModule;

  beforeEach(() => {
    activityFilterModule = new ActivityFilterModule();
  });

  it('should create an instance', () => {
    expect(activityFilterModule).toBeTruthy();
  });
});
