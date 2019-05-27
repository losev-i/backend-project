import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import * as bcrypt from 'bcryptjs';

import { User } from '../../../entities/User';
import { RegisterInput } from './RegisterInput';

/**
 * Resolver class
 */
@Resolver()
export class RegisterResolver {
  /**
   * Resolver class needs query, otherwise an error is thrown
   * Will be replaced
   */
  @Query(() => User, { nullable: true })
  hello(): string {
    return 'Hello World!';
  }

  /**
   * Registration mutation
   * Has to be extended to include permissions/roles etc. (?)
   * Hashes the password using bcrypt
   * @returns registered User
   */
  @Mutation(() => User)
  async register(@Arg('data')
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    email = email.toLowerCase();
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 12)
    }).save();

    return user;
  }
}
// : 100%;
// }

// .tsd-widget:before,
// .tsd-select .tsd-select-label:before,
// .tsd-select .tsd-select-list li:before {
//   content: '';
//   display: inline-block;
//   width: 40px;
//   height: 40px;
//   margin: 0 -8px 0 0;
//   background-image: url(../images/widgets.png);
//   background-repeat: no-repeat;
//   text-indent: -1024px;
//   vertical-align: bottom;
// }
// @media (-webkit-min-device-pixel-ratio: 1.5),
//   (min-device-pixel-ratio: 1.5),
//   (min-resolution: 144dpi) {
//   .tsd-widget:before,
//   .tsd-select .tsd-select-label:before,
//   .tsd-select .tsd-select-list li:before {
//     background-image: url(../images/widgets@2x.png);
//     background-size: 320px 40px;
//   }
// }

// .tsd-widget {
//   display: inline-block;
//   overflow: hidden;
//   opacity: 0.6;
//   height: 40px;
//   transition: opacity 0.1s, background-color 0.2s;
//   vertical-align: bottom;
//   cursor: pointer;
// }
// .tsd-widget:hover {
//   opacity: 0.8;
// }
// .tsd-widget.active {
//   opacity: 1;
//   background-color: #eee;
// }
// .tsd-widget.no-caption {
//   width: 40px;
// }
// .tsd-widget.no-caption:before {
//   margin: 0;
// }
// .tsd-widget.search:before {
//   background-position: 0 0;
// }
// .tsd-widget.menu:before {
//   background-position: -40px 0;
// }
// .tsd-widget.options:before {
//   background-position: -80px 0;
// }
// .tsd-widget.options,
// .tsd-widget.menu {
//   display: none;
// }
// @media (max-width: 900px) {
//   .tsd-widget.options,
//   .tsd-widget.menu {
//     display: inline-block;
//   }
// }
// input[type='checkbox'] + .tsd-widget:before {
//   background-position: -120px 0;
// }
// input[type='checkbox']:checked + .tsd-widget:before {
//   background-position: -160px 0;
// }

// .tsd-select {
//   position: relative;
//   display: inline-block;
//   height: 40px;
//   transition: opacity 0.1s, background-color 0.2s;
//   vertical-align: bottom;
//   cursor: pointer;
// }
// .tsd-select .tsd-select-label {
//   opacity: 0.6;
//   transition: opacity 0.2s;
// }
// .tsd-select .tsd-select-label:before {
//   background-position: -240px 0;
// }
// .tsd-select.active .tsd-select-label {
//   opacity: 0.8;
// }
// .tsd-select.active .tsd-select-list {
//   visibility: visible;
//   opacity: 1;
//   transition-delay: 0s;
// }
// .tsd-select .tsd-select-list {
//   position: absolute;
//   visibility: hidden;
//   top: 40px;
//   left: 0;
//   margin: 0;
//   padding: 0;
//   opacity: 0;
//   list-style: none;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
//   transition: visibility 0s 0.2s, opacity 0.2s;
// }
// .tsd-select .tsd-select-list li {
//   padding: 0 20px 0 0;
//   background-color: #fdfdfd;
// }
// .tsd-select .tsd-select-list li:before {
//   background-position: 40px 0;
// }
// .tsd-select .tsd-select-list li:nth-child(even) {
//   background-color: #fff;
// }
// .tsd-select .tsd-select-list li:hover {
//   background-color: #eee;
// }
// .tsd-select .tsd-select-list li.selected:before {
//   background-position: -200px 0;
// }
// @media (max-width: 900px) {
//   .tsd-select .tsd-select-list {
//     top: 0;
//     left: auto;
//     right: 100%;
//     margin-right: -5px;
//   }
//   .tsd-select .tsd-select-label:before {
//     background-position: -280px 0;
//   }
// }

// img {
//   max-width: 100%;
// }
