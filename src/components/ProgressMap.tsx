'use client';

import {
  FileCheck,
  FileSearch,
  Send,
  Stamp,
  User,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: 'Profile Setup', icon: User, status: 'completed' },
  { id: 2, name: 'Visa Selection', icon: FileCheck, status: 'current' },
  { id: 3, name: 'Document Submission', icon: Send, status: 'upcoming' },
  { id: 4, name: 'Application Review', icon: FileSearch, status: 'upcoming' },
  { id: 5, name: 'Decision', icon: Stamp, status: 'upcoming' },
];

export function ProgressMap() {
  return (
    <div className="w-full">
      <h3 className="mb-6 text-lg font-semibold font-headline">
        Your Application Journey
      </h3>
      <div className="flex items-center">
        {steps.map((step, stepIdx) => (
          <div
            key={step.name}
            className={cn('relative flex flex-1 flex-col items-center gap-2')}
          >
            {/* Connecting line */}
            {stepIdx > 0 && (
              <div
                className="absolute left-[-50%] top-[1.125rem] h-0.5 w-full -translate-y-1/2"
                aria-hidden="true"
              >
                <div
                  className={cn(
                    'h-full w-full',
                    step.status === 'completed' || step.status === 'current'
                      ? 'bg-primary'
                      : 'bg-border'
                  )}
                />
              </div>
            )}
            {/* Step circle */}
            <div
              className={cn(
                'relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2',
                step.status === 'completed'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : step.status === 'current'
                  ? 'border-primary bg-background'
                  : 'border-border bg-background'
              )}
            >
              {step.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <step.icon
                  className={cn(
                    'h-5 w-5',
                    step.status === 'current'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                />
              )}
            </div>
            {/* Step name */}
            <p
              className={cn(
                'text-center text-sm',
                step.status === 'current'
                  ? 'font-semibold text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {step.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
