type Constructor<T = {}> = new (...args: any[]) => T;

interface Timestamped {
    timestamp: number
}
function Timestamped<T extends Constructor>(Base: T): Constructor<Timestamped> & T {
    return class extends Base {
        timestamp = Date.now();
    };
}

interface Activatable {
    isActivated: boolean
    activate: () => void
    deactivate: () => void
}
function Activatable<T extends Constructor>(Base: T): Constructor<Activatable> & T {
    return class extends Base {
        isActivated = false;

        activate() {
            this.isActivated = true;
        }

        deactivate() {
            this.isActivated = false;
        }
    };
}

class User {
    constructor(public name: string, public age: number) { }
}

const TimestampedActivatableUser = Timestamped(Activatable(User));
const user = new TimestampedActivatableUser('test', 17)

console.log(user.name)
console.log(user.age)
console.log(user.timestamp)
console.log(user.activate())
console.log(user.isActivated)

