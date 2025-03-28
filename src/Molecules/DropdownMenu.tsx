import { Button } from "../Atoms/Button";

interface DropdownMenuProps {
    onPinLeft: () => void;
    onPinRight: () => void;
    onUnpin: () => void;
    onAccending: () => void;
    onDecending: () => void;
}
export const DropdownMenu = ({ onPinLeft, onPinRight, onUnpin, onAccending, onDecending }: DropdownMenuProps) => (
    <div className="dropdown-menu">
        <Button onClick={onAccending}>⬆️ Accending</Button>
        <Button onClick={onDecending}>⬇️ Decending</Button>
        <Button onClick={onPinLeft}>⬅️ Pin Left</Button>
        <Button onClick={onPinRight}>➡️ Pin Right</Button>
        <Button onClick={onUnpin}>❌ Reset</Button>
    </div>
);