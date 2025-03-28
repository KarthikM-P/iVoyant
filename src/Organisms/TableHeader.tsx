/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../Atoms/Button";
import { DropdownMenu } from "../Molecules/DropdownMenu";
import DraggableColumnHeader from "../DraggableColumnHeader";

export const TableHeader = ({ id, label, isOpen, onToggleDropdown, onPinLeft, onPinRight, onUnpin, onAccending, onDecending }:any) => (
    <div className="header-container">
        <DraggableColumnHeader id={id} label={label} />
        <div className="header-actions">
            <Button className="dots-button" onClick={onToggleDropdown}>
                ⋮
            </Button>
            {isOpen && (
                <DropdownMenu
                    onAccending={onAccending}
                    onDecending={onDecending}
                    onPinLeft={onPinLeft}
                    onPinRight={onPinRight}
                    onUnpin={onUnpin}
                />
            )}
        </div>
    </div>
);