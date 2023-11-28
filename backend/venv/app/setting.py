from enum import Enum


class Flag(Enum):
    DEV = 0
    OPERATION = 1

CURRENT_FLAG : Flag = Flag.DEV