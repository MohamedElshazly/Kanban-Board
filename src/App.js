import KanbanBoard from './components/KanbanBoard';
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
					<KanbanBoard />
				</DndProvider>
    </div>
  );
}

export default App;
