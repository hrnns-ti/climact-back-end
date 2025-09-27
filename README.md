# ClimACT API 🌱

**RESTful API service powering the Climact climate action platform**

> *Turning climate intentions into measurable actions through robust backend infrastructure*

## 📋 Overview

This backend service provides the core functionality for Climact - a gamified climate action platform that helps users track sustainability tasks, reduce carbon footprint, and participate in environmental challenges.
###
### 🎯 Core Modules

**🔐 Authentication & User Management** - Secure user accounts and profiles with role-based access  
**📋 Task Engine** - Dynamic daily/weekly climate action challenges  
**🏆 Gamification System** - Points, achievements, and progress tracking  
**📊 Analytics Engine** - Carbon footprint calculations and impact metrics  
**👥 Community Features** - Events, groups, and social interactions  

###
### 🔐 Progress

| Method         | Endpoint            | Description                 | Status        |
|----------------|---------------------|-----------------------------|---------------|
| `POST`         | `/api/auth/sign-up` | Create new climate warrior  | ✅ **Live**    |
| `POST`         | `/api/auth/sign-in` | User authentication         | ✅ **Live**    |
| `GET`          | `/api/auth/id`      | Get user profile            | ✅ **Live**    |
| `PUT & DELETE` | `/api/auth/id`      | Update user settings        | ✅ **Live**    |
| -              | -                   | Quest Module                | 🚧 **Dev**    |
| -              | -                   | Badge Module                | 🚧 **Dev**    |
| -              | -                   | Article & Education Content | 🚧 **Dev**    |
| -              | -                   | Improve Authorization       | 🚧 **Dev**    |
| -              | -                   | -                           | 🚧 **Dev**    |

###
## Authors

- [@hearunnas](https://www.github.com/hrnns-ti)


###
## Tech Stack
**Server:** Node, Express, MongoDB