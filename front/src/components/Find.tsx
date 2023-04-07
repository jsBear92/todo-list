import { useState } from 'react';

const Find: React.FC = () => {
    const [toggleFind, setToggleFind] = useState(false);

    return(
        <div>
            <div onClick={() => setToggleFind(true)}>
                {!toggleFind ?
                    <p className="absolute top-2 right-3 bg-green-200">Find</p> :
                    <div>
                        <input
                            type="text"
                            placeholder="Find todo"
                            className="absolute w-2/6 top-2 right-3 bg-violet-200"
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default Find;