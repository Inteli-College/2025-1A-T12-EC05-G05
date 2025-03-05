import json
import pydobot
import pydobot.enums
import pydobot.enums.CommunicationProtocolIDs
import pydobot.enums.ControlValues
import pydobot.message
from .position import Position

with open("config.json", "r") as file:
    home_saved_positions = json.load(file)
    
    home_position = Position()
    home_position.load_from_dict(home_saved_positions["home"][0])

class DobotController:
    def __init__(self):
        self.tool_enable = False
        self.home_position = home_position
        self.conected = False

    def connect(self, port):
        self.dobot = pydobot.Dobot(port=port, verbose=False)
        self.conect = True
        
    def disconect(self):
        self.dobot.close
        self.conected = False

    def pose(self):
        current_position = Position(*self.dobot.pose())
        current_position.suction == self.tool_enable
        print(current_position)
        return current_position
    
    def set_speed(self, speed, acceleration):
        self.dobot.speed(speed, acceleration)

    def move_l_to(self, position, wait=True):
        self.dobot.move_to(*position.to_list(), wait=wait)

    def move_j_to(self, position, wait=True):
        self.dobot._set_ptp_cmd(*position.to_list(), mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)

    def home(self, wait=True):
            self.move_j_to(self.home_position, wait=wait)
            
    def enable_tool(self, time):
        self.dobot.suck(True)
        self.dobot.wait(time)
        self.tool_enabled = True

    def disable_tool(self, time):
        self.dobot.suck(False)
        self.dobot.wait(time)
        self.tool_enabled = False