import React from 'react'
import Popup from 'reactjs-popup'
import { Button } from '@material-ui/core'
import { Slide } from 'react-slideshow-image'
import background from '../homeBackground.jpeg'
import 'react-slideshow-image/dist/styles.css'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      restaurants: [],
      tags: [],
      fetchedRestaurants: false
    }
    this.generateButtons = this.generateButtons.bind(this)
    this.generateTagTable = this.generateTagTable.bind(this)
    this.getRestaurantTags = this.getRestaurantTags.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    var myHeaders = new Headers()
    myHeaders.append(
      'User-Agent',
      'Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0'
    )
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('auth_token')
    )
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch('http://127.0.0.1:4000/restaurants/all', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({
          restaurants: result
        })
      })
      .catch(error => console.log('error', error))
    myHeaders = new Headers()
    myHeaders.append(
      'User-Agent',
      'Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0'
    )
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('auth_token')
    )
    requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch('http://127.0.0.1:4000/tags/all', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({
          tags: result,
          fetchedRestaurants: true
        })
      })
      .catch(error => console.log('error', error))
  }

  logout () {
    localStorage.clear()
    window.location.reload()
  }

  generateTagTable (tags, priceRangeLow, priceRangeHigh) {
    let firstRow = []
    let secondRow = []
    let array = tags
    for (let index = 0; index < array.length; index++) {
      firstRow.push(
        <td align='center' style={{ padding: '10px' }}>
          {' '}
          <img
            src={`${array[index].imageLink}`}
            style={{ width: '60px' }}
          />{' '}
        </td>
      )
      secondRow.push(
        <td style={{ padding: '10px' }}>
          <p style={{ textAlign: 'center' }}> {array[index].text} </p>
        </td>
      )
    }
    if (array.length > 0) {
      firstRow.push(
        <td align='center' style={{ padding: '10px' }}>
          {' '}
          <img
            src='http://127.0.0.1:4000/img/logo.png'
            style={{ width: '60px' }}
          />{' '}
        </td>
      )
    }
    if (priceRangeLow < 1) {
      secondRow.push(
        <td>
          <p style={{ textAlign: 'center' }}> Moins de {priceRangeHigh}€</p>
        </td>
      )
    } else {
      secondRow.push(
        <td>
          <p style={{ textAlign: 'center' }}>
            {' '}
            Entre {priceRangeLow}€ et {priceRangeHigh}€
          </p>
        </td>
      )
    }
    return (
      <tbody>
        <tr>{firstRow}</tr>
        <tr>{secondRow}</tr>
      </tbody>
    )
  }

  getRestaurantTags (restaurant) {
    let ret = []
    let array = restaurant.tags
    for (let index = 0; index < array.length; index++) {
      let array2 = this.state.tags
      for (let index2 = 0; index2 < array2.length; index2++) {
        console.log('array1:')
        console.log(array[index])
        console.log('array2:')
        console.log(array2[index2].id)
        if (array[index] === array2[index2].id) {
          ret.push(array2[index2])
        }
      }
    }
    console.log('yo')
    console.log(ret)
    return ret
  }

  generateButtons () {
    let buttons = []
    var array = this.state.restaurants
    let image = ''
    for (let index = 0; index < array.length; index++) {
      image = ''
      if (array[index].images.length > 0) {
        image = (
          <div style={{ textAlign: 'center' }}>
            <img
              src={`data:image/jpeg;base64,${array[index].images[0]}`}
              style={{ width: '400px' }}
            />
          </div>
        )
      }
      buttons.push(
        <tr>
          <td style={{ padding: '40px' }}>
            <Popup
              trigger={
                <Button
                  style={{
                    border: '1px solid grey',
                    backgroundColor: '#ff224d',
                    color: 'white',
                    width: '20px'
                  }}
                >
                  {' '}
                  {array[index].name}{' '}
                </Button>
              }
              position='left'
            >
              <div
                style={{
                  alignContent: 'center',
                  textAlign: 'left',
                  backgroundColor: 'white',
                  width: '450px',
                  height: '600px'
                }}
              >
                <div style={{ paddingLeft: '5px' }}>
                  {image}
                  <h1> {array[index].name}</h1>
                  <h2> {array[index].speciality}</h2>
                  <p> {array[index].address}</p>
                  <table>
                    {this.generateTagTable(
                      this.getRestaurantTags(array[index]),
                      array[index].priceRangeLow,
                      array[index].priceRangeHigh
                    )}
                  </table>
                </div>
              </div>
            </Popup>
          </td>
        </tr>
      )
    }
    return buttons
  }
  render () {
    if (this.state.fetchedRestaurants) {
      return (
        <div
          style={{
            backgroundImage: `url(${background})`,
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no - repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}
        >
          <div style={{ height: '10px' }} />
          <Button
            style={{
              border: '1px solid grey',
              backgroundColor: '#ff224d',
              color: 'white',
              width: '100px'
            }}
            type='submit'
            className='btn'
            onClick={this.logout}
          >
            Logout
          </Button>
          <table style={{ paddingTop: '200px', paddingLeft: '48%' }}>
            <tbody style={{ textAlign: 'center' }}>
              {this.generateButtons()}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <h1></h1>
    }
  }
}
