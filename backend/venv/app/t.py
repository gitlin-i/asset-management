import datetime
from apscheduler.schedulers.blocking import BlockingScheduler

sc = BlockingScheduler()
def hi():
    print(datetime.datetime.now())
    print("!!!!!")


sc.add_job(hi, 'interval', seconds=2)

sc.start()