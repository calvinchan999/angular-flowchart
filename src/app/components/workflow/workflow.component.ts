import { Component, ViewChild } from '@angular/core';
import { NgFlowchart, NgFlowchartStepComponent, NgFlowchartCanvasDirective } from '@joelwenzel/ng-flowchart';

interface WorkflowAction {
  name: string;
  type: string;
  icon: string;
  data: {
    name: string;
    params?: any;
  };
}

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent {
  @ViewChild(NgFlowchartCanvasDirective) canvas!: NgFlowchartCanvasDirective;
  
  selectedStep: any = null;
  callbacks: NgFlowchart.Callbacks = {};
  options: NgFlowchart.Options = {
    stepGap: 40,
    rootPosition: 'TOP_CENTER',
    zoom: {
      mode: 'WHEEL'
    }
  };

  items: WorkflowAction[] = [
    {
      name: 'Start',
      type: 'start',
      icon: 'play_circle',
      data: { name: 'Start' }
    },
    {
      name: 'Move To',
      type: 'move',
      icon: 'open_with',
      data: { 
        name: 'Move To',
        params: {
          x: 0,
          y: 0,
          speed: 1
        }
      }
    },
    {
      name: 'Rotate',
      type: 'rotate',
      icon: 'rotate_right',
      data: { 
        name: 'Rotate',
        params: {
          degrees: 360,
          speed: 1
        }
      }
    },
    {
      name: 'Wait',
      type: 'wait',
      icon: 'timer',
      data: { 
        name: 'Wait',
        params: {
          seconds: 10
        }
      }
    },
    {
      name: 'If Condition',
      type: 'condition',
      icon: 'help',
      data: { 
        name: 'If Condition',
        params: {
          condition: '',
          operator: '==',
          value: ''
        }
      }
    },
    {
      name: 'Repeat',
      type: 'repeat',
      icon: 'loop',
      data: { 
        name: 'Repeat',
        params: {
          times: 1
        }
      }
    },
    {
      name: 'When Event',
      type: 'event',
      icon: 'bolt',
      data: { 
        name: 'When Event',
        params: {
          eventKey: '',
          eventType: 'keypress'
        }
      }
    },
    {
      name: 'Play Sound',
      type: 'sound',
      icon: 'volume_up',
      data: { 
        name: 'Play Sound',
        params: {
          soundFile: '',
          volume: 1
        }
      }
    }
  ];

  constructor() {
    this.callbacks.onDropError = this.onDropError.bind(this);
    this.callbacks.onDropStep = this.onDropStep.bind(this);
  }

  getIconForType(type: string): string {
    const item = this.items.find(i => i.type === type);
    return item ? item.icon : 'help_outline';
  }

  onDropStep(drop: NgFlowchart.DropEvent) {
    console.log('Step dropped', drop);
    this.selectedStep = drop.step;
  }

  onDropError(error: NgFlowchart.DropError) {
    console.log('Drop error', error);
  }

  deleteStep(step: any) {
    if (this.canvas) {
      if (this.selectedStep && this.selectedStep.id === step.id) {
        this.selectedStep = null;
      }
    }
  }
} 