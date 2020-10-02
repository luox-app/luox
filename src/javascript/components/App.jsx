import React, {useState} from 'react';
import Results from './Results';
import UploadForm from './UploadForm';

const App = () => {
  const [radianceOrIrradiance, setRadianceOrIrradiance] = useState('irradiance');
  const [rows, setRows] = useState(null);
  const [sampleCount, setSampleCount] = useState(null);

  return (
    <>
      <div className="row">
        <div className="col">
          <h1 className="mt-5">
            Reporting Light Exposure
          </h1>
        </div>
      </div>
      <UploadForm
        radianceOrIrradiance={radianceOrIrradiance}
        setRadianceOrIrradiance={setRadianceOrIrradiance}
        setRows={setRows}
        setSampleCount={setSampleCount}
      />
      <Results
        rows={rows}
        sampleCount={sampleCount}
        radianceOrIrradiance={radianceOrIrradiance}
      />
    </>
  );
};

export default App;
