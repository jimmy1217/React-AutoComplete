import React from 'react'
import { Autocomplete, Dropdown } from 'components'
import { Example } from 'demoComponents'

const fakeDataObj1 = {
    test1: { name: "apple", fruit: "蘋果A" },
    test2: { name: "banana", fruit: "香蕉B" },
    test3: { name: "orange", fruit: "橘子C" },
    test4: { name: "tomato", fruit: "番茄D" },
    test5: { name: "strawberry", fruit: "草莓E" },
    test6: { name: "wax apple", fruit: "蓮霧F" },
    test7: { name: "blueberry", fruit: "藍莓G" },
    test8: { name: "mango", fruit: "芒果H" }
};

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test8" }
]

const Root = () => {
    return (
        <div className="wrapper">
            <div className="wrapper-title">
                <h1 className="text-white fw-100">Preact AutoComplete</h1>
                <h5 className="text-white ls-1">更輕 • 更小 • 更直覺的 Components</h5>
            </div>


            <Example
                title="Basic Search"
                code={`import React from 'react';
import { Autocomplete } from 'preact-autocomplete';

const Root = () => {
    return (
        <div>
            <Autocomplete />
        </div>
    );
};

ReactDOM.render(<Root/>,document.getElementById("root"));`}>
                <Autocomplete />
            </Example>
            <Example
                title="Search From Object"
                code={`import React from 'react';
import { Autocomplete } from 'preact-autocomplete';

const fakeDataObj1 = {
    test1: { name: "apple", fruit: "蘋果A" },
    test2: { name: "banana", fruit: "香蕉B" },
    test3: { name: "orange", fruit: "橘子C" },
    test4: { name: "tomato", fruit: "番茄D" },
    test5: { name: "strawberry", fruit: "草莓E" },
    test6: { name: "wax apple", fruit: "蓮霧F" },
    test7: { name: "blueberry", fruit: "藍莓G" },
    test8: { name: "mango", fruit: "芒果H" }
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

ReactDOM.render(<Root/>,document.getElementById("root"));`}>
                <Autocomplete
                    data={fakeDataObj1}
                />
            </Example>
            <Example
                title="Search From Array"
                code={`import React from 'react';
import { Autocomplete } from 'preact-autocomplete';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test8" }
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

ReactDOM.render(<Root/>,document.getElementById("root"));`}>
                <Autocomplete
                    data={fakeDataArr1}
                    placeholder="type 'apple' or 'orange' "
                />
            </Example>
            <Example
                title="Custom Filter Key"
                code={`import React from 'react';
import { Autocomplete } from 'preact-autocomplete';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test8" }
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

ReactDOM.render(<Root/>,document.getElementById("root"));`}>
                <Autocomplete
                    data={fakeDataArr1}
                    filterKey="fruit"
                    placeholder="請輸入 '蘋果'、'橘子' "
                />
            </Example>
            <Example
                title="Custom Output Key"
                code={`import React from 'react';
import { Autocomplete } from 'preact-autocomplete';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test8" }
];

const Root = () => {
    return (
        <div>
            <Autocomplete 
                data={fakeDataArr1}
                keys="fruit"
                placeholder="Search {Object.name}, Output {Object.fruit}"
                onChange={ val =>{\`alert(Output is \${val}\`)}}
            />
        </div>
    );
};

ReactDOM.render(<Root/>,document.getElementById("root"));`}>
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
import { Autocomplete } from 'preact-autocomplete';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test8" }
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

ReactDOM.render(<Root/>,document.getElementById("root"));`}>
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
import { Autocomplete } from 'preact-autocomplete';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test8" }
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

ReactDOM.render(<Root/>,document.getElementById("root"));`}>
                <Autocomplete
                    data={fakeDataArr1}
                    placeholder="打個 'z'吧"
                    keys="_id"
                    emptyText="自己定義查詢不到的結果"
                />
            </Example>
            <Example
                title="Alway Reset Value"
                code={`import React from 'react';
import { Autocomplete } from 'preact-autocomplete';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test8" }
];

const Root = () => {
    return (
        <div>
            <Autocomplete 
                data={fakeDataArr1}
                clickReset={true}
                placeholder="Alway reset value"
                keys="_id"
            />
        </div>
    );
};

ReactDOM.render(<Root/>,document.getElementById("root"));`}>
                <Autocomplete
                    data={fakeDataArr1}
                    clickReset={true}
                    placeholder="每次點擊時清空項目"
                    keys="_id"
                />
            </Example>
            <Example
                title="Dropdown"
                code={`import React from 'react';
import { Dropdown } from 'preact-autocomplete';

const fakeDataArr1 = [
    { name: "apple", fruit: "蘋果A", _id: "test1" },
    { name: "banana", fruit: "香蕉B", _id: "test2" },
    { name: "orange", fruit: "橘子C", _id: "test3" },
    { name: "tomato", fruit: "番茄D", _id: "test4" },
    { name: "strawberry", fruit: "草莓E", _id: "test5" },
    { name: "wax apple", fruit: "蓮霧F", _id: "test6" },
    { name: "blueberry", fruit: "藍莓G", _id: "test7" },
    { name: "mango", fruit: "芒果H", _id: "test8" }
];

const Root = () => {
    return (
        <div>
            <Dropdown 
                data={fakeDataArr1}
                placeholder="Dropdown"
            />
        </div>
    );
};

ReactDOM.render(<Root/>,document.getElementById("root"));`}>
                <Dropdown
                    data={fakeDataArr1}
                    placeholder="Dropdown"
                />
            </Example>
            <div className="table-api">
                <table className="">
                    <tbody>
                        <tr>
                            <th>Property</th>
                            <th>Description</th>
                            <th className="min-w-80">Type</th>
                            <th>Default</th>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>下拉類型,可以為 autocomplete 或 dropdown</td>
                            <td>String</td>
                            <td>autocomplete</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>Boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>clickReset</td>
                            <td>點擊時是否直接清除value</td>
                            <td>Boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>className</td>
                            <td>最外層的wrap className</td>
                            <td>String || Null</td>
                            <td>null</td>
                        </tr>
                        <tr>
                            <td>emptyText</td>
                            <td>找不到資料時出現的內容</td>
                            <td>String</td>
                            <td>查無結果</td>
                        </tr>
                        <tr>
                            <td>placeholder</td>
                            <td>預設的placeholder</td>
                            <td>String</td>
                            <td>請搜尋想找的項目</td>
                        </tr>
                        <tr>
                            <td>filterKey</td>
                            <td>要過濾的項目key值</td>
                            <td>String</td>
                            <td>name</td>
                        </tr>
                        <tr>
                            <td>searchAddon</td>
                            <td>icon 內容，type 為autocomplete 顯示在前面,為 dropdown 顯示在後面</td>

                            <td>React.ReactElement</td>
                            <td><pre>{`<span 
    className="defaultSearch">
    &#9906;
</span>`}</pre></td>
                        </tr>
                        <tr>
                            <td>autoFocus</td>
                            <td>自動 focus input</td>
                            <td>Boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>setValue</td>
                            <td>選擇項目後是否帶入input 內</td>
                            <td>Boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>keys</td>
                            <td>指定output 的key值,若沒設定直接帶出 Index</td>
                            <td>String</td>
                            <td>null</td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>主要資料來源</td>
                            <td>Array || Object</td>
                            <td><pre>{`[
    { name: 'apple', fruit: '蘋果' }, 
    { name: 'banana', fruit: '香蕉' }
]`}</pre></td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>選定值之後的callback</td>
                            <td>function(val)</td>
                            <td><pre>{`(value) => {
    console.log(\`callback value is \${value}\`)
}`}</pre></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Root;