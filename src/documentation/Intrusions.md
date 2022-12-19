# Intrusions

## Path
src/components/Intrusions/Intrusions.js

## Child Components

```js
import SearchBar from "../SearchBar/SearchBar";
<SearchBar handleSearch={handleSearch} addNew="/new/owners"/>
```

```js
import IntrusionCard from "../IntrusionCard/IntrusionCard";
<IntrusionCard intrusion={intrusion} handleSelection={handleSelection.bind(this)}/>
```

```js
import VideoModal from "../VideoModal/VideoModal";
<VideoModal intrusion={selectedIntrusion} handleClose={() => setSelectedIntrusion(null)} />
```

## Props
N/A