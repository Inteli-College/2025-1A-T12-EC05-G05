class Position:
    def __init__(
            self,
            x: float = 0.0,
            y: float = 0.0,
            z: float = 0.0,
            r: float = 0.0,
            j1: float = 0.0,
            j2: float =  0.0,
            j3: float = 0.0,
            j4: float = 0.0,
            grip: bool = False,
            suction: bool = False,
            move: str = "move_l"
            ):
        
        self.x = round(x, 2)
        self.y = round(y, 2)
        self.z = round(z, 2)
        self.r = round(r, 2)
        self.j1 = round(j1, 2)
        self.j2 = round(j2, 2)
        self.j3 = round(j3, 2)
        self.j4 = round(j4, 2)
        self.grip = grip 
        self.suction = suction
        self.move = move

    def to_list(self):
        return [self.x, self.y, self.z, self.r]

    def load_from_dict(self, data):
        self.x = data["x"]
        self.y = data["y"]
        self.z = data["z"]
        self.r = data["r"]
        self.j1 = data["j1"]
        self.j2 = data["j2"]
        self.j3 = data["j3"]
        self.j4 = data["j4"]
        self.grip = data.get("grip", False)
        self.suction = data.get("suction", False)
        self.move = data.get("move", False)
        
    def to_dict(self):
        return {
            "x": self.x,
            "y": self.y,
            "z": self.z,
            "r": self.r,
            "j1": self.j1,
            "j2": self.j2,
            "j3": self.j3,
            "j4": self.j4,
            "grip": self.grip,
            "suction": self.suction,
            "move": self.move
        }
    
    def __repr__(self):
        return f"x: {self.x}, y: {self.y}, z: {self.z}, r: {self.r}, j1: {self.j1}, j2: {self.j2}, j3: {self.j3}, j4: {self.j4}, grip: {self.grip}, suction: {self.suction}"