
import EChartsComponent from '../components/EchartsComponent';
import LayerCheckboxList from '../components/LayerCheckboxList';

const Sidebar = ({ layers, toggleLayerVisibility }) => {
    return (
        <div className="sidebar">
            <LayerCheckboxList layers={layers} toggleLayerVisibility={toggleLayerVisibility} />
            <EChartsComponent />
        </div>
    );
}

export default Sidebar;
