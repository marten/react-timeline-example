import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import { number } from 'prop-types';

class Automation {
  private schedules: Schedule[];
  
  constructor() {
    this.schedules = [];
  }

  addSchedule(schedule: Schedule) {
    this.schedules.push(schedule);
  }
}

type ID = number;

interface DayEvent {
  delay: number;
  measurementId: ID;
}

interface DailySchedule {
  id: ID;
  scheduler: string;
  dayEvents: DayEvent[];
}

interface IntervalSchedule {
  id: ID;
  scheduler: string;
}

type Schedule = DailySchedule | IntervalSchedule;

function demoAutomation() {
  const automation = new Automation();

  const dailySchedule = {id: 1, scheduler: "daily", dayEvents: [
    {delay: 0, measurementId: 1},
    {delay: 14400, measurementId: 1}
  ]};

  automation.addSchedule(dailySchedule);

  return automation;
}




interface EditorProps {
  automation: Automation;
}

const Editor: React.FC<EditorProps> = ({ automation }) => {
  return <div>foo</div>;
}

interface PreviewProps {
  automation: Automation;
}

class Preview extends React.Component<PreviewProps, {}> {
  private svgRef: React.RefObject<SVGSVGElement>;

  constructor(props: PreviewProps) {
    super(props);
    this.svgRef = React.createRef();
  }

  componentDidMount() {
    d3.select(this.svgRef.current);
  }

  render() {
    return <svg ref={this.svgRef}></svg>
  }
}


const App: React.FC = () => {
  const [automation, setAutomation] = React.useState(demoAutomation());

  return (
    <div className="App">
      <header>Editor</header>
      <section>
        <Editor automation={automation} />
      </section>

      <header>EPD</header>
      <section>
        <Preview automation={automation} />
      </section>
    </div>
  );
}

export default App;
