class SensorsService:
    def __init__(self):
        self.caught = None

    def new_status_catch(self, status):
        self.caught = status
        return self.caught

    def get_status(self):
        return self.caught
