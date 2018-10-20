import { ActivityDetailsModule } from './activity-details.module';

describe('ActivityDetailsModule', () => {
  let activityDetailsModule: ActivityDetailsModule;

  beforeEach(() => {
    activityDetailsModule = new ActivityDetailsModule();
  });

  it('should create an instance', () => {
    expect(activityDetailsModule).toBeTruthy();
  });
});
