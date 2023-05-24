import { ICommand } from "../interfaces/ICommand";
import { About } from "./About"
import { View } from "./View";
import { Register } from "./Register";

export const CommandList: ICommand[] = [About, Register, View];