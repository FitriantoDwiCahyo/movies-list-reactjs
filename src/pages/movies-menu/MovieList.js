import React, { Component } from "react";
import { Table, Space, Popconfirm, message, Button, Input } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import APISanber from "../../api/API";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            dataSourceTemp: null,
            filteredInfo: null,
            sortedInfo: null,
            filterYear: [],
            filterRating: [],
            searchText: "",
            searchedColumn: "",
        };

        this.filterGenre = [
            { text: "Action", value: "Action" },
            { text: "Adventure", value: "Adventure" },
            { text: "Animation", value: "Animation" },
            { text: "Comedy", value: "Comedy" },
            { text: "Drama", value: "Drama" },
            { text: "Fantasy", value: "Fantasy" },
            { text: "Horror", value: "Horror" },
            { text: "Romance", value: "Romance" },
            { text: "Sci-fi", value: "Sci-fi" },
        ];
    }

    componentDidMount() {
        APISanber.get("/data-movie")
            .then((res) => {
                this.setState({ dataSource: res.data });
                this.initFilterData(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }

    initFilterData = async (data) => {
        // init year filter data
        const newSetFilterYear = [...new Set(data.map((value) => value.year))];
        const newFilterYear = newSetFilterYear.map((value) => {
            return { text: value, value: value };
        });
        this.setState({ filterYear: newFilterYear });

        // init rating filter data
        const newSetFilterRating = [
            ...new Set(data.map((value) => value.rating)),
        ];
        const newFilterRating = newSetFilterRating.map((value) => {
            return { text: value, value: value };
        });
        this.setState({ filterRating: newFilterRating });
    };

    handleTableChange = (pagination, filters, sorter) => {
        console.log("Various parameters", pagination, filters, sorter);
        this.setState((state) => ({
            filteredInfo: filters,
            sortedInfo: sorter,
            dataSourceTemp: state.dataSourceTemp
                ? state.dataSourceTemp
                : state.dataSource,
        }));
        console.log("this.state.sortedInfo", this.state.sortedInfo);
    };

    clearAll = () => {
        this.setState((state) => ({
            searchText: "",
            dataSource: state.dataSourceTemp
                ? state.dataSourceTemp
                : state.dataSource,
            dataSourceTemp: null,
            filteredInfo: null,
            sortedInfo: null,
        }));
    };

    handleDelete = (value) => {
        APISanber.delete(`/data-movie/${value.id}`)
            .then((res) => {
                console.log("res.data", res.data);
                message.success(`${value.title} deleted successfully!`);
                this.componentDidMount();
            })
            .catch((err) => {
                alert(err);
            });
    };

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        const dataSourceTemp = (this.state.dataSourceTemp
            ? this.state.dataSourceTemp
            : this.state.dataSource
        ).filter((value) => {
            return value?.title
                .toString()
                .toLowerCase()
                .includes(selectedKeys[0].toLowerCase());
        });
        confirm();
        this.setState((state) => ({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
            dataSourceTemp: state.dataSourceTemp
                ? state.dataSourceTemp
                : state.dataSource,
            dataSource: dataSourceTemp,
        }));
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState((state) => ({
            searchText: "",
            dataSource: state.dataSourceTemp
                ? state.dataSourceTemp
                : state.dataSource,
            dataSourceTemp: null,
        }));
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            this.handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    render() {
        const columns = [
            {
                title: "Title",
                dataIndex: "title",
                key: "title",
                sorter: (a, b) => a.title.localeCompare(b.title),
                sortOrder:
                    this.state.sortedInfo?.columnKey === "title" &&
                    this.state.sortedInfo?.order,
                ...this.getColumnSearchProps("title"),
            },
            {
                title: "Year",
                dataIndex: "year",
                key: "year",
                sorter: (a, b) => a.year - b.year,
                sortOrder:
                    this.state.sortedInfo?.columnKey === "year" &&
                    this.state.sortedInfo?.order,
                filteredValue: this.state.filteredInfo?.year || null,
                filters: this.state.filterYear,
                onFilter: (value, record) =>
                    String(record.year).includes(value),
            },
            {
                title: "Duration",
                dataIndex: "duration",
                key: "duration",
                sorter: (a, b) => a.duration - b.duration,
                sortOrder:
                    this.state.sortedInfo?.columnKey === "duration" &&
                    this.state.sortedInfo?.order,
            },
            {
                title: "Rating",
                dataIndex: "rating",
                key: "rating",
                sorter: (a, b) => a.rating - b.rating,
                sortOrder:
                    this.state.sortedInfo?.columnKey === "rating" &&
                    this.state.sortedInfo?.order,
                filteredValue: this.state.filteredInfo?.rating || null,
                filters: this.state.filterRating,
                onFilter: (value, record) =>
                    String(record.rating).includes(value),
            },
            {
                title: "Genre",
                dataIndex: "genre",
                key: "genre",
                sorter: (a, b) => a.genre.localeCompare(b.genre),
                sortOrder:
                    this.state.sortedInfo?.columnKey === "genre" &&
                    this.state.sortedInfo?.order,
                filteredValue: this.state.filteredInfo?.genre || null,
                filters: this.filterGenre,
                onFilter: (value, record) => record.genre.includes(value),
            },
            {
                title: "Image Url",
                dataIndex: "image_url",
                key: "image_url",
                sorter: (a, b) => a.image_url.localeCompare(b.image_url),
                sortOrder:
                    this.state.sortedInfo?.columnKey === "image_url" &&
                    this.state.sortedInfo?.order,
                render: (text) => (
                    <p
                        style={{
                            maxWidth: 200,
                            maxHeight: "3em",
                            overflow: "hidden",
                        }}
                    >
                        {text}
                    </p>
                ),
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description",
                sorter: (a, b) => a.description.localeCompare(b.description),
                sortOrder:
                    this.state.sortedInfo?.columnKey === "description" &&
                    this.state.sortedInfo?.order,
                render: (text) => (
                    <p
                        style={{
                            maxWidth: 300,
                            maxHeight: "3em",
                            overflow: "hidden",
                        }}
                    >
                        {text}
                    </p>
                ),
            },
            {
                title: "Action",
                key: "action",
                render: (text, record) => (
                    <Space size="middle">
                        <Link to={`/movie-menu/edit/${record.id}`}>
                            <EditOutlined />
                        </Link>
                        <Popconfirm
                            placement="topRight"
                            title={`Are you sure want to delete ${record.title}?`}
                            onConfirm={() => {
                                this.handleDelete(record);
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div style={{ color: "red", cursor: "pointer" }}>
                                <DeleteOutlined />
                            </div>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Button
                    style={{ float: "right", marginBottom: 8 }}
                    onClick={this.clearAll}
                >
                    Clear filters
                </Button>
                <Table
                    scroll={{ x: "max-content" }}
                    dataSource={this.state.dataSource}
                    columns={columns}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}
