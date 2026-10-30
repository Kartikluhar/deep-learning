/**
 * MLForge Low-Level Design (LLD) & Object-Oriented Design Data
 * Complete OOP principles, SOLID guidelines, 12 GoF design patterns,
 * and comprehensive LLD case studies with complete Python & Java code.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};
window.MLForge.sysdesign.data = window.MLForge.sysdesign.data || {};

MLForge.sysdesign.data.solidPrinciples = [
  {
    letter: 'S',
    name: 'Single Responsibility Principle (SRP)',
    summary: 'A class should have one, and only one, reason to change.',
    explanation: 'Each class must focus on a single piece of business functionality. If a class handles database persistence, payment processing, AND sends email receipts, any change to email templates forces re-testing payment logic.',
    badExample: 'class User: def register(self): pass; def save_to_db(self): pass; def send_welcome_email(self): pass',
    goodExample: 'class UserRepository: def save(self, user): pass\nclass EmailService: def send_welcome(self, user): pass\nclass UserService: def register(self, data): ...'
  },
  {
    letter: 'O',
    name: 'Open/Closed Principle (OCP)',
    summary: 'Software entities should be open for extension, but closed for modification.',
    explanation: 'You should be able to add new functionality without modifying existing, tested source code. This is achieved using polymorphism and interfaces.',
    badExample: 'def calculate_discount(order): if order.type == "VIP": return 0.2\n elif order.type == "STUDENT": return 0.1 (Modifying this function for every new discount type)',
    goodExample: 'class DiscountStrategy(ABC): @abstractmethod def get_discount(self): pass\nclass VIPDiscount(DiscountStrategy): ...\nclass StudentDiscount(DiscountStrategy): ...'
  },
  {
    letter: 'L',
    name: 'Liskov Substitution Principle (LSP)',
    summary: 'Subtypes must be substitutable for their base types without altering program correctness.',
    explanation: 'If Class B is a subtype of Class A, replacing an instance of A with B should never break the application or throw unexpected exceptions.',
    badExample: 'class Rectangle: set_width(), set_height()\nclass Square(Rectangle): set_width(w) { this.w = w; this.h = w; } (Breaks client assumption that changing width leaves height unchanged)',
    goodExample: 'class Shape(ABC): @abstractmethod def area(self): pass\nclass Rectangle(Shape): ...\nclass Square(Shape): ...'
  },
  {
    letter: 'I',
    name: 'Interface Segregation Principle (ISP)',
    summary: 'Clients should not be forced to depend on methods they do not use.',
    explanation: 'Favor many small, specific interfaces over one fat, general-purpose interface. A bloated interface forces implementing classes to write dummy empty methods.',
    badExample: 'interface Worker { void work(); void eat(); void sleep(); }\nclass RobotWorker implements Worker { void eat() { /* do nothing */ } }',
    goodExample: 'interface Workable { void work(); }\ninterface Feedable { void eat(); }\nclass Human implements Workable, Feedable { ... }\nclass Robot implements Workable { ... }'
  },
  {
    letter: 'D',
    name: 'Dependency Inversion Principle (DIP)',
    summary: 'High-level modules should not depend on low-level modules; both should depend on abstractions.',
    explanation: 'Do not instantiate concrete low-level implementations directly inside high-level business classes. Inject dependencies via interfaces.',
    badExample: 'class NotificationService:\n    def __init__(self):\n        self.sender = MySQLDatabase() # Hardcoded concrete dependency',
    goodExample: 'class NotificationService:\n    def __init__(self, db_client: DatabaseInterface):\n        self.db = db_client # Injected interface abstraction'
  }
];

MLForge.sysdesign.data.lldCaseStudies = [
  // =========================================================================
  // LLD 1: PARKING LOT
  // =========================================================================
  {
    id: 'parking-lot',
    title: 'Design a Multi-Floor Parking Lot System',
    difficulty: 'Medium',
    category: 'Object-Oriented Design',
    requirements: [
      'The parking lot has multiple floors, each with numbered spots.',
      'Spot sizes: MOTORCYCLE, COMPACT (cars), LARGE (trucks/buses).',
      'Electric vehicle charging spots with surcharge.',
      'Entry gate dispenses timestamped tickets; exit gate computes fees and processes payment.',
      'Flexible hourly pricing strategy (e.g. flat rate, progressive hourly rate, peak-hour multiplier).'
    ],
    entities: [
      'Vehicle (license_plate, VehicleType: MOTORCYCLE, CAR, TRUCK)',
      'ParkingSpot (id, floor, SpotType, is_occupied, current_vehicle)',
      'ParkingFloor (floor_number, spots_list, display_board)',
      'ParkingLot (Singleton: floors, entry_gates, exit_gates)',
      'Ticket (id, vehicle, spot, entry_time)',
      'PricingStrategy (Interface: calculate_fee(ticket, exit_time))',
      'Payment (ticket, amount, PaymentMethod, status)'
    ],
    patternsUsed: ['Singleton (ParkingLot)', 'Factory (Vehicle & Spot creation)', 'Strategy (PricingCalculation)'],
    classDiagram: `
+-------------------------------------------------------------+
|                         ParkingLot                          |
|  - floors: List<ParkingFloor>                               |
|  - entryGates: List<EntryGate>                              |
|  - exitGates: List<ExitGate>                                |
+-------------------------------------------------------------+
               | 1..*                                   | 1..*
               v                                        v
+-------------------------------+       +-------------------------------+
|         ParkingFloor          |       |           EntryGate           |
|  - floorNumber: int           |       |  + issueTicket(v): Ticket     |
|  - spots: List<ParkingSpot>   |       +-------------------------------+
+-------------------------------+
               | 1..*
               v
+-------------------------------+       +-------------------------------+
|          ParkingSpot          |       |            Ticket             |
|  - id: String                 |       |  - id: String                 |
|  - spotType: SpotType         | <---> |  - entryTime: DateTime        |
|  - isOccupied: boolean        |       |  - vehicle: Vehicle           |
|  + assignVehicle(v): boolean  |       +-------------------------------+
+-------------------------------+
    `,
    pythonCode: `from enum import Enum
from datetime import datetime, timedelta
from abc import ABC, abstractmethod

class VehicleType(Enum):
    MOTORCYCLE = 1
    CAR = 2
    TRUCK = 3

class SpotType(Enum):
    SMALL = 1
    COMPACT = 2
    LARGE = 3

class Vehicle:
    def __init__(self, license_plate: str, vehicle_type: VehicleType):
        self.license_plate = license_plate
        self.vehicle_type = vehicle_type

class ParkingSpot:
    def __init__(self, spot_id: str, floor: int, spot_type: SpotType):
        self.spot_id = spot_id
        self.floor = floor
        self.spot_type = spot_type
        self.vehicle = None

    def is_available(self) -> bool:
        return self.vehicle is None

    def can_fit_vehicle(self, vehicle: Vehicle) -> bool:
        if vehicle.vehicle_type == VehicleType.MOTORCYCLE:
            return True
        elif vehicle.vehicle_type == VehicleType.CAR:
            return self.spot_type in [SpotType.COMPACT, SpotType.LARGE]
        elif vehicle.vehicle_type == VehicleType.TRUCK:
            return self.spot_type == SpotType.LARGE
        return False

    def park(self, vehicle: Vehicle) -> bool:
        if self.is_available() and self.can_fit_vehicle(vehicle):
            self.vehicle = vehicle
            return True
        return False

    def vacate(self):
        self.vehicle = None

class Ticket:
    def __init__(self, ticket_id: str, vehicle: Vehicle, spot: ParkingSpot):
        self.ticket_id = ticket_id
        self.vehicle = vehicle
        self.spot = spot
        self.entry_time = datetime.now()

class PricingStrategy(ABC):
    @abstractmethod
    def calculate_fee(self, ticket: Ticket, exit_time: datetime) -> float:
        pass

class HourlyPricingStrategy(PricingStrategy):
    RATES = {VehicleType.MOTORCYCLE: 10.0, VehicleType.CAR: 20.0, VehicleType.TRUCK: 50.0}

    def calculate_fee(self, ticket: Ticket, exit_time: datetime) -> float:
        hours = max(1, int((exit_time - ticket.entry_time).total_seconds() // 3600))
        return hours * self.RATES[ticket.vehicle.vehicle_type]

class ParkingLot:
    _instance = None

    def __init__(self):
        self.spots = []
        self.tickets = {}
        self.pricing_strategy = HourlyPricingStrategy()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = ParkingLot()
        return cls._instance

    def add_spot(self, spot: ParkingSpot):
        self.spots.append(spot)

    def park_vehicle(self, vehicle: Vehicle) -> Ticket:
        for spot in self.spots:
            if spot.park(vehicle):
                ticket_id = f"TICK-{vehicle.license_plate}-{int(datetime.now().timestamp())}"
                ticket = Ticket(ticket_id, vehicle, spot)
                self.tickets[ticket_id] = ticket
                return ticket
        raise Exception("Parking Lot Full for this vehicle type")

    def exit_vehicle(self, ticket_id: str) -> float:
        if ticket_id not in self.tickets:
            raise ValueError("Invalid ticket ID")
        ticket = self.tickets[ticket_id]
        exit_time = datetime.now() + timedelta(hours=3) # Simulated 3 hours stay
        fee = self.pricing_strategy.calculate_fee(ticket, exit_time)
        ticket.spot.vacate()
        del self.tickets[ticket_id]
        return fee

# Example Run
lot = ParkingLot.get_instance()
lot.add_spot(ParkingSpot("S1", 1, SpotType.COMPACT))
my_car = Vehicle("CA-1234", VehicleType.CAR)
t = lot.park_vehicle(my_car)
fee = lot.exit_vehicle(t.ticket_id)
print(f"Vehicle CA-1234 parked at spot S1. Fee calculated: $" + f"{fee}")
`,
    edgeCases: [
      'Concurrent Park Attempts: Multiple threads claiming the exact same parking spot (require mutex lock or optimistic locking).',
      'Lost Ticket: Fallback to max daily rate calculation.',
      'Electric Vehicle Spot surcharges and dynamic surge pricing on weekends.'
    ]
  },

  // =========================================================================
  // LLD 2: ELEVATOR SYSTEM
  // =========================================================================
  {
    id: 'elevator-system',
    title: 'Design an Elevator Management System',
    difficulty: 'Hard',
    category: 'State Machine & Dispatching',
    requirements: [
      'A high-rise building with $N$ floors and $K$ elevators.',
      'Passengers press internal buttons (destination floor) and external buttons (Up/Down on floors).',
      'Elevator states: MOVING_UP, MOVING_DOWN, IDLE, MAINTENANCE.',
      'Efficient elevator dispatching algorithm (LOOK/SCAN algorithm to minimize passenger wait times).'
    ],
    entities: [
      'ElevatorCar (id, current_floor, direction, state, floor_requests_set)',
      'ElevatorController (elevators, assign_request(floor, direction))',
      'Request (source_floor, destination_floor, direction)',
      'Direction (Enum: UP, DOWN, IDLE)',
      'ElevatorState (Enum: MOVING, STOPPED, IDLE, MAINTENANCE)'
    ],
    patternsUsed: ['State Pattern (Elevator movement states)', 'Strategy Pattern (Dispatching algorithms: SCAN/LOOK vs Shortest Seek)'],
    classDiagram: `
+-----------------------------------+
|        ElevatorController         |
|  - elevators: List<ElevatorCar>   |
|  + requestElevator(floor, dir)    |
|  + step()                         |
+-----------------------------------+
                  | 1..*
                  v
+-----------------------------------+
|            ElevatorCar            |
|  - id: int                        |
|  - currentFloor: int              |
|  - direction: Direction           |
|  - state: ElevatorState           |
|  - destinationFloors: TreeSet<int>|
|  + addDestination(floor: int)     |
|  + moveNext()                     |
+-----------------------------------+
    `,
    pythonCode: `from enum import Enum
from typing import List, Set

class Direction(Enum):
    UP = 1
    DOWN = -1
    IDLE = 0

class ElevatorState(Enum):
    MOVING = 1
    STOPPED = 2
    IDLE = 3

class ElevatorCar:
    def __init__(self, elevator_id: int):
        self.id = elevator_id
        self.current_floor = 1
        self.direction = Direction.IDLE
        self.state = ElevatorState.IDLE
        self.up_requests: Set[int] = set()
        self.down_requests: Set[int] = set()

    def add_request(self, floor: int):
        if floor > self.current_floor:
            self.up_requests.add(floor)
            if self.direction == Direction.IDLE:
                self.direction = Direction.UP
        elif floor < self.current_floor:
            self.down_requests.add(floor)
            if self.direction == Direction.IDLE:
                self.direction = Direction.DOWN
        else:
            print(f"Elevator {self.id} is already on floor {floor}!")

    def step(self):
        if self.direction == Direction.UP:
            if self.current_floor in self.up_requests:
                self.up_requests.remove(self.current_floor)
                print(f"Elevator {self.id} stopped at Floor {self.current_floor} to let passengers out.")
            
            if self.up_requests:
                self.current_floor += 1
            else:
                self.direction = Direction.DOWN if self.down_requests else Direction.IDLE

        elif self.direction == Direction.DOWN:
            if self.current_floor in self.down_requests:
                self.down_requests.remove(self.current_floor)
                print(f"Elevator {self.id} stopped at Floor {self.current_floor} to let passengers out.")

            if self.down_requests:
                self.current_floor -= 1
            else:
                self.direction = Direction.UP if self.up_requests else Direction.IDLE

class ElevatorDispatcher:
    def __init__(self, elevators: List[ElevatorCar]):
        self.elevators = elevators

    def select_best_elevator(self, floor: int, direction: Direction) -> ElevatorCar:
        # Choose closest elevator already moving in the requested direction or an idle one
        best_car = None
        min_distance = float('inf')
        for car in self.elevators:
            if car.direction == direction or car.direction == Direction.IDLE:
                dist = abs(car.current_floor - floor)
                if dist < min_distance:
                    min_distance = dist
                    best_car = car
        return best_car or self.elevators[0]

# Example execution
e1 = ElevatorCar(1)
e2 = ElevatorCar(2)
dispatcher = ElevatorDispatcher([e1, e2])

# Passenger on floor 4 requests elevator going UP
car = dispatcher.select_best_elevator(4, Direction.UP)
car.add_request(4)
car.add_request(7) # Inside button pressed to floor 7
for _ in range(7):
    car.step()
`,
    edgeCases: [
      'Elevator Overweight capacity sensor stops doors from closing.',
      'Emergency fire alarm overrides all queues, forcing all elevators down to Ground Floor immediately.',
      'Power failure failsafe activates mechanical friction brakes.'
    ]
  },

  // =========================================================================
  // LLD 3: SPLITWISE
  // =========================================================================
  {
    id: 'splitwise-expense-sharing',
    title: 'Design an Expense Sharing App (Splitwise)',
    difficulty: 'Medium',
    category: 'Graph & Financial Accounting',
    requirements: [
      'Users can add expenses and split them among group members.',
      'Splits supported: EQUAL, EXACT amounts, and PERCENTAGE.',
      'Maintain an internal balance sheet of who owes whom.',
      'Simplify Debts algorithm: Minimize total number of payment transactions to settle all group debts.'
    ],
    entities: [
      'User (id, name, email)',
      'Split (user, amount, percentage)',
      'ExpenseType (EQUAL, EXACT, PERCENT)',
      'Expense (id, paid_by, amount, splits, description)',
      'Group (id, name, members, expenses)',
      'BalanceSheet (user_balances: Map<User, Map<User, Double>>)'
    ],
    patternsUsed: ['Strategy Pattern (EqualSplit vs ExactSplit vs PercentSplit)', 'Factory Pattern (ExpenseFactory)'],
    classDiagram: `
+---------------------------------------+
|                 User                  |
|  - id: String                         |
|  - name: String                       |
+---------------------------------------+
                   ^
                   | paidBy
+---------------------------------------+
|                Expense                |
|  - id: String                         |
|  - amount: double                     |
|  - paidBy: User                       |
|  - splits: List<Split>                |
|  + validate(): boolean                |
+---------------------------------------+
                   | 1..*
                   v
+---------------------------------------+
|                 Split                 |
|  - user: User                         |
|  - amount: double                     |
+---------------------------------------+
    `,
    pythonCode: `from abc import ABC, abstractmethod
from typing import List, Dict

class User:
    def __init__(self, user_id: str, name: str):
        self.id = user_id
        self.name = name

class Split:
    def __init__(self, user: User, amount: float = 0.0):
        self.user = user
        self.amount = amount

class SplitwiseManager:
    def __init__(self):
        self.users: Dict[str, User] = {}
        # balances[user_a][user_b] = amount user_a owes user_b
        self.balances: Dict[str, Dict[str, float]] = {}

    def add_user(self, user: User):
        self.users[user.id] = user
        self.balances[user.id] = {}

    def add_equal_expense(self, paid_by: User, total_amount: float, participants: List[User]):
        split_amount = round(total_amount / len(participants), 2)
        for user in participants:
            if user.id == paid_by.id:
                continue
            # user owes paid_by
            user_debts = self.balances[user.id]
            user_debts[paid_by.id] = user_debts.get(paid_by.id, 0.0) + split_amount

            # Update opposite direction
            paid_by_debts = self.balances[paid_by.id]
            paid_by_debts[user.id] = paid_by_debts.get(user.id, 0.0) - split_amount

    def show_balances(self):
        for user_id, debts in self.balances.items():
            for owes_to, amount in debts.items():
                if amount > 0:
                    print(f"{self.users[user_id].name} owes {self.users[owes_to].name}: $" + f"{amount:.2f}")

# Example Usage
mgr = SplitwiseManager()
alice = User("1", "Alice")
bob = User("2", "Bob")
charlie = User("3", "Charlie")

for u in [alice, bob, charlie]: mgr.add_user(u)

# Alice pays $60 for Dinner for all 3
mgr.add_equal_expense(alice, 60.0, [alice, bob, charlie])
mgr.show_balances()
# Bob owes Alice: $20.00
# Charlie owes Alice: $20.00
`,
    edgeCases: [
      'Rounding Drift: Dividing $100 among 3 people equals $33.33 each, leaving 1 cent unaccounted for (assign leftover cent to first payer).',
      'Transitive Debt Simplification: If A owes B $10 and B owes C $10, simplify to A owes C $10 directly using Min-Cash-Flow graph algorithm.'
    ]
  }
];
