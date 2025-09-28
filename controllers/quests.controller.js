import Quest from '../models/quests.model.js';
import UserQuest from '../models/userQuest.model.js';
import User from "../models/user.model.js";
import moment from 'moment';


export const getQuests = async (req, res, next) => {
    try {
        const quests = await Quest.find();
        res.status(200).json({success: true, data: quests, message: 'Quests List'});
    } catch(error) {
        next(error);
    }
}

// KHUSUS ADMIN
export const createQuest = async (req, res, next) => {
    try {
        const { title, description, period, points } = req.body;
        if (!title || !description || !period || !points) {
            return res.status(400).json({success: false, message: 'Please fill the required fields'});
        }

        const quest = new Quest({title, description, period, points});
        await quest.save();

        res.status(200).json({success: true, data: quest, message: 'Created Quest'});
    } catch(error) {
        next(error);
    }
}

// UPDATE QUEST (NTAH BUAT APA, SIAPA TAU KEPAKE NANTI, KALO NGGAK YA TINGGAL HAPUS)
export const updateQuest = async (req, res, next) => {
    try {
        const quest = await Quest.findById(req.params.id);
        if (!quest) {
            return res.status(404).json({success: false, message: 'Quest not found'});
        }

        const { title, description, period, points } = req.body;

        if (title) quest.title = title;
        if (description) quest.description = description;
        if (period) quest.period = period;
        if (points) quest.points = points;

        await quest.save();
        res.status(200).json({success: true, data: quest, message: 'Updated Quest'});
    } catch(error) {
        next(error);
    }
}

export const deleteQuest = async (req, res, next) => {
    try {
        const quest = await Quest.findById(req.params.id);
        if (!quest) {
            return res.status(404).json({success: false, message: 'Quest not found'});
        }
        await Quest.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, data: quest, message: 'Deleted Quest'});
    } catch(error) {
        next(error);
    }
}

// BUAT SUBMIT INI CUY
export const submitQuest = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const questId = req.params.id;
        const {proof} = req.body;
        const user = await User.findById(userId)
        const quest = await Quest.findById(questId);
        if (!quest || !quest.active) {
            return res.status(404).json({success: false, message: 'Quest not found'});
        }

        const now = moment();
        let periodStart, periodEnd;
        if (quest.period === 'Daily') {
            periodStart = now.clone().startOf('day');
            periodEnd = now.clone().endOf('day');
        } else if (quest.period === 'Weekly') {
            periodStart = now.clone().startOf('week');
            periodEnd = now.clone().endOf('week');
        } else if (quest.period === 'Monthly') {
            periodStart = now.clone().startOf('month');
            periodEnd = now.clone().endOf('month');
        }

        // Cek apakah sudah submit quest ini di periode yang sama
        const alreadyCompleted = user.completedQuests && user.completedQuests.some(q =>
            q.quest.toString() === questId &&
            q.period === quest.period &&
            moment(q.completedAt).isBetween(periodStart, periodEnd, null, '[]')
        );
        if (alreadyCompleted) {
            return res.status(200).json({ success: true, message: 'Quest Already Completed' });
        }

        // Simpan ke UserQuest (detail aktivitas)
        const userQuest = new UserQuest({
            userId,
            questId,
            status: 'Completed',
            proof: proof || '',
            pointsEarned: quest.points,
            completedAt: now.toDate()
        });
        await userQuest.save();

        // Simpan ringkasan ke completedQuests di User
        user.completedQuests.push({
            quest: quest._id,
            period: quest.period,
            completedAt: now.toDate()
        });
        user.points = (user.points || 0) + (quest.points || 0);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Quest berhasil disubmit',
            data: {
                quest: quest.title,
                period: quest.period,
                points: user.points,
                userQuestId: userQuest._id
            }
        });
    } catch(error) {
        next(error);
    }
}

// HISTORY QUEST
export const getUserQuestHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const history = await UserQuest.find({ userId }).populate('questId');
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        next(error);
    }
};
