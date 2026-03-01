'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface FilterDropdownProps {
    label: string;
    options: string[];
    selected: string | null;
    onSelect: (option: string | null) => void;
    icon?: React.ReactNode;
}

const FilterDropdown = ({ label, options, selected, onSelect, icon }: FilterDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="flex items-center gap-2 mb-1.5 ml-1">
                {icon && <span className="text-light-200 opacity-60">{icon}</span>}
                <span className="text-[0.65rem] font-bold text-light-200 uppercase tracking-widest opacity-60">
                    {label}
                </span>
            </div>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full min-w-[140px] px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200 outline-none
                    ${isOpen
                        ? 'bg-white/10 border-primary/50 text-white shadow-[0_0_15px_rgba(89,222,202,0.1)]'
                        : 'bg-white/[0.03] border-white/10 text-light-200 hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
            >
                <span className="capitalize">{selected || 'All'}</span>
                <ChevronDown
                    size={16}
                    className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'text-light-200'}`}
                />
            </button>

            {isOpen && (
                <div className="absolute left-0 z-50 w-full min-w-[160px] mt-2 origin-top-left bg-[#0c1212] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-200">
                    <div className="p-1.5">
                        <button
                            onClick={() => {
                                onSelect(null);
                                setIsOpen(false);
                            }}
                            className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors
                                ${!selected ? 'bg-primary/10 text-primary font-semibold' : 'text-light-200 hover:bg-white/5 hover:text-white'}`}
                        >
                            <span>All</span>
                            {!selected && <Check size={14} />}
                        </button>

                        <div className="h-[1px] bg-white/5 my-1" />

                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    onSelect(option);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors capitalize
                                    ${selected === option ? 'bg-primary/10 text-primary font-semibold' : 'text-light-200 hover:bg-white/5 hover:text-white'}`}
                            >
                                <span>{option}</span>
                                {selected === option && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
