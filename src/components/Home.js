import React, { Component } from 'react';
import productData from '../data/products-dataset.json';
import ScrollUpButton from "react-scroll-up-button";
import InfiniteScroll from "react-infinite-scroll-component";

class Home extends Component {
    constructor() {
        super()
        this.state = {
            productData:productData.slice(0,8),
            flag: true,
            hasMore:true,
            counter:8
        }
    }
    onSearch(event) {
        console.log(event.target.value)
        var newarray = this.state.productData.filter((iter) => {
            if (iter.title.toLocaleLowerCase().includes(event.target.value)) {
                return true
            }
        })
        console.log("newarr", newarray)
        if (event.target.value === '') {
            this.setState({ productData: productData, flag: true })
        } else if (newarray.length === 0) {
            this.setState({ flag: false })
        } else {
            this.setState({ productData: newarray })
        }

    }
    fetchMoreData = () => { 
        console.log("fetch")
        let productDataNew = this.state.productData
       if(this.state.productData.length === productData.length){
        this.setState({ hasMore: false });
        return;
       }
       setTimeout(() => {
        this.setState({productData: productDataNew.concat(productData.slice(this.state.counter,this.state.counter+8)),counter :this.state.counter+8});
      }, 800);
    // this.setState({productData: productDataNew.concat(productData.slice(this.state.counter,this.state.counter+8)),counter :this.state.counter+8})
    }

    render() {
        let itemList = this.state.productData.map(item => {
            return (
                <div className="card w3-card" key={item.id}>

                    <img src={item.imageUrl} className="card-image" />
                    {/* <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" ><i className="material-icons">add</i></span> */}


                    <div className="w3-container">
                        <h5>{item.title}</h5>
                        <p>{item.subTitle}</p>
                        <p><b>Price: {item.price}$</b></p>
                    </div>
                </div>

            )
        })

        return (
            <div className="w3-container">
                <div className="w3-content w3-padding-64">
                    <input onChange={(e) => { this.onSearch(e) }} class="w3-input w3-border-black" type="text" placeholder="Search" />
                </div>
                {this.state.flag ?
                    <InfiniteScroll
                        dataLength={this.state.productData.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={<div class="w3-center"><h5>Loading</h5></div>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <div className="box"> {itemList}</div>



                    </InfiniteScroll>
                    : <div class="w3-center">No Results Found</div>}
                <ScrollUpButton />
            </div>
        )
    }
}


export default Home;