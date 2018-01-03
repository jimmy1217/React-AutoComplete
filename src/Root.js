import React from 'react';
import { Autocomplete, Example } from 'components';
const fakeDataObj1 = {
    test1: { name: "apple", fruit: "蘋果A" },
    test2: { name: "banana", fruit: "香蕉B" },
    test3: { name: "orange", fruit: "橘子C" },
    test4: { name: "tomato", fruit: "番茄D" },
    test5: { name: "strawberry", fruit: "草莓E" },
    test6: { name: "wax apple", fruit: "蓮霧F" },
    test7: { name: "blueberry", fruit: "藍莓G" },
    test7: { name: "mango", fruit: "芒果H" }
};

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test7" }
]



const Root = () => {
    return (
        <div className="wrapper">
            <h1 className="text-green mb-40 fw-100">React AutoComplete</h1>
            <Example
                title="Basic Search"
                code={`import React from 'react';
import { Autocomplete } from 'components';

const Root = () => {
    return (
        <div>
            <Autocomplete />
        </div>
    );
};

ReactDOM.render(
    <Root/>,
    document.getElementById("root")
);`}>
                <Autocomplete />
            </Example>

            <Example
                title="Search From Object"
                code={`import React from 'react';
import { Autocomplete } from 'components';

const fakeDataObj1 = {
    test1: { name: "apple", fruit: "蘋果A" },
    test2: { name: "banana", fruit: "香蕉B" },
    test3: { name: "orange", fruit: "橘子C" },
    test4: { name: "tomato", fruit: "番茄D" },
    test5: { name: "strawberry", fruit: "草莓E" },
    test6: { name: "wax apple", fruit: "蓮霧F" },
    test7: { name: "blueberry", fruit: "藍莓G" },
    test7: { name: "mango", fruit: "芒果H" }
};

const Root = () => {
    return (
        <div>
            <Autocomplete 
                data={fakeDataObj1}
            />
        </div>
    );
};

ReactDOM.render(
    <Root/>,
    document.getElementById("root")
);`}>
                <Autocomplete
                    data={fakeDataObj1}
                />
            </Example>
            <Example
                title="Search From Array"
                code={`import React from 'react';
import { Autocomplete } from 'components';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test7" }
];

const Root = () => {
    return (
        <div>
            <Autocomplete 
                data={fakeDataArr1}
            />
        </div>
    );
};

ReactDOM.render(
    <Root/>,
    document.getElementById("root")
);`}>
                <Autocomplete
                    data={fakeDataArr1}
                    placeholder="type 'apple' or 'orange' "
                />
            </Example>
            <Example
                title="Custom Filter Key"
                code={`import React from 'react';
import { Autocomplete } from 'components';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test7" }
];

const Root = () => {
    return (
        <div>
            <Autocomplete 
                data={fakeDataArr1}
                filterKey="fruit"
                placeholder="請輸入 '蘋果'、'橘子' "
            />
        </div>
    );
};

ReactDOM.render(
    <Root/>,
    document.getElementById("root")
);`}>
                <Autocomplete
                    data={fakeDataArr1}
                    filterKey="fruit"
                    placeholder="請輸入 '蘋果'、'橘子' "
                />
            </Example>
            <Example
                title="Custom Output Key"
                code={`import React from 'react';
import { Autocomplete } from 'components';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test7" }
];

const Root = () => {
    return (
        <div>
            <Autocomplete 
                data={fakeDataArr1}
                keys="fruit"
                placeholder="Search {Object.fruit}, Output {Object.name}"
                onChange={ val =>{\`alert(Output is \${val}\`)}}
            />
        </div>
    );
};

ReactDOM.render(
    <Root/>,
    document.getElementById("root")
);`}>
                <Autocomplete
                    data={fakeDataArr1}
                    keys="fruit"
                    placeholder="Search {Object.fruit}, Output {Object.name}"
                    onChange={val => { alert(`Output is ${val}`) }}
                />
            </Example>
            <Example
                title="Callback value"
                code={`import React from 'react';
import { Autocomplete } from 'components';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test7" }
];

const Root = () => {
    return (
        <div>
            <Autocomplete 
                data={fakeDataArr1}
                placeholder="不設值到 input"
                setValue={false}
                keys="_id"
                onChange={ val =>{\`alert(Output is \${val}\`)}}
            />
        </div>
    );
};

ReactDOM.render(
    <Root/>,
    document.getElementById("root")
);`}>
                <Autocomplete
                    data={fakeDataArr1}
                    placeholder="不設值到 input"
                    setValue={false}
                    keys="_id"
                    onChange={val => { alert(`Output is ${val}`) }}
                />
            </Example>
            <Example
                title="Costom No Result"
                code={`import React from 'react';
import { Autocomplete } from 'components';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test7" }
];

const Root = () => {
    return (
        <div>
            <Autocomplete 
                data={fakeDataArr1}
                placeholder="打個 'z'吧"
                keys="_id"
            />
        </div>
    );
};

ReactDOM.render(
    <Root/>,
    document.getElementById("root")
);`}>
                <Autocomplete
                    data={fakeDataArr1}
                    placeholder="打個 'z'吧"
                    keys="_id"
                    emptyText="自己定義查詢不到的結果"
                />
            </Example>
        </div>
    );
};

export default Root;