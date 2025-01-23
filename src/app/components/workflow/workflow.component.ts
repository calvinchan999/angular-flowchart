import { Component, ViewChild, OnInit } from '@angular/core';
import { NgFlowchart, NgFlowchartStepComponent, NgFlowchartCanvasDirective } from '@joelwenzel/ng-flowchart';

interface WorkflowAction {
  name: string;
  type: string;
  icon: string;
  shape: string;
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
export class WorkflowComponent implements OnInit {
  @ViewChild(NgFlowchartCanvasDirective) canvas!: NgFlowchartCanvasDirective;
  
  selectedStep: any = null;
  
  callbacks: NgFlowchart.Callbacks = {
    onDropStep: (drop: NgFlowchart.DropEvent) => {
      console.log('Step dropped', drop);
      this.selectedStep = drop.step;
    },
    onDropError: (error: NgFlowchart.DropError) => {
      console.log('Drop error', error);
    }
  };

  options: NgFlowchart.Options = {
    stepGap: 40,
    rootPosition: 'FREE',
    orientation: 'VERTICAL',
    isSequential: false,
    manualConnectors: true,
    zoom: {
      mode: 'WHEEL'
    }
  };

  items: WorkflowAction[] = [
    {
      name: 'Start',
      type: 'start',
      icon: 'play_circle',
      shape: 'circle',
      data: { name: 'Start' }
    },
    {
      name: 'Move To',
      type: 'move',
      icon: 'open_with',
      shape: '',
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
      shape: '',
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
      shape: '',
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
      shape: 'diamond',
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
      shape: '',
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
      shape: '',
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
      shape: '',
      data: { 
        name: 'Play Sound',
        params: {
          soundFile: '',
          volume: 1
        }
      }
    },
    {
      name: 'Process',
      type: 'process',
      icon: 'settings',
      shape: 'hexagon',
      data: { 
        name: 'Process',
        params: {
          action: ''
        }
      }
    }
  ];

  constructor() {}

  ngOnInit() {
    // Initialize any required setup
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

  deleteStep(step: NgFlowchartStepComponent) {
    if (this.canvas) {
      const flow = this.canvas.getFlow();
      if (flow) {
        // flow.getStep(step.id)?.delete();
        if (this.selectedStep && this.selectedStep.id === step.id) {
          this.selectedStep = null;
        }
      }
    }
  }

  editStep(step: any) {
    this.selectedStep = step;
    // Prevent event propagation to avoid triggering other click handlers
    event?.stopPropagation();
  }

  getItemDescription(type: string): string {
    switch (type) {
      case 'start':
        return 'Starting point of the workflow';
      case 'move':
        return 'Move to specific coordinates';
      case 'rotate':
        return 'Rotate by specified degrees';
      case 'wait':
        return 'Wait for specified duration';
      case 'condition':
        return 'Branch based on condition';
      case 'repeat':
        return 'Repeat actions multiple times';
      case 'event':
        return 'Trigger on specific event';
      case 'sound':
        return 'Play a sound effect';
      case 'process':
        return 'Process action';
      default:
        return '';
    }
  }

  getShapeClass(type: string): string {
    const item = this.items.find(i => i.type === type);
    return item ? `shape-${item.shape}` : '';
  }
} 