import { useState } from "react";
import { Diagnoses } from "../../types";
import { InputLabel, Select, MenuItem, SelectChangeEvent, Button, FormControl,OutlinedInput, Checkbox, ListItemText,Grid} from '@mui/material';

interface DiagnosesCodeOption {
    value: Diagnoses['code'];
    label: string;    
}

interface Props {
    setDiagnosisCodes : React.Dispatch<React.SetStateAction<Array<Diagnoses['code']>>>;
    codeOptions : Array<DiagnosesCodeOption>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DiagnosisCode : React.FC<Props> = ({ setDiagnosisCodes, codeOptions}) => {

    const [codes,setCodes] = useState<Array<Diagnoses['code']>>([]);

    const onCodeChange = (event: SelectChangeEvent<typeof codes>) => {
        const {
            target: { value },
          } = event;
          setCodes(
            typeof value === 'string' ? value.split(',') : value,
          );

    };

    const submitDiagnosisCodes = () => {
        setDiagnosisCodes(codes);
    };

    return(
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="Diagnosis-Code-checkbox">Diagnosis Code</InputLabel>
                    <Select
                        labelId="Diagnosis-Code-checkbox"
                        id="Diagnosis-Code-checkbox"
                        label="Diagnosis Code"
                        multiple
                        value={codes}
                        onChange={onCodeChange}
                        input={<OutlinedInput label="Diagnosis Code" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {codeOptions.map(option =>
                            <MenuItem
                                key={option.label}
                                value={option.value}
                            >
                                <Checkbox checked={codes.indexOf(option.value) > -1} />
                                    <ListItemText primary={option.label} />
                            </MenuItem>
                        )}
                    </Select>
                <Grid>
                    <Grid item sx={{ paddingTop : 1}}>
                        <Button
                                style={{
                                    float: "right",
                                    paddingTop : 1
                                }}
                                onClick={submitDiagnosisCodes}
                                variant="contained"
                            >
                            Add Selected Diagnosis Codes
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    );
};

export default DiagnosisCode;